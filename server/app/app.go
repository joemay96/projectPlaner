package app

import (
	// Das Context package provides a mechanism to comunicate and handle cancelation - sehr wichtig bei concurent/nebenläufigen programmen und den routinen zu sagen wann sie enden sollen
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/redis/go-redis/v9"
)

type App struct {
	router http.Handler
	rdb    *redis.Client
	config Config
}

func New(config Config) *App {
	app := &App{
		rdb: redis.NewClient(&redis.Options{
			Addr: config.RedisAddress,
		}),
		config: config,
	}

	app.loadRoutes()

	return app
}

func (a *App) Start(ctx context.Context) error {
	server := &http.Server{
		Addr:    fmt.Sprintf(":%d", a.config.ServerPort),
		Handler: a.router,
	}

	// TODO: when connection is failing retry connecting after some time.
	err := a.rdb.Ping(ctx).Err()
	if err != nil {
		return fmt.Errorf("Failed to connect to redis: %w", err)
	}

	defer func() {
		if err := a.rdb.Close(); err != nil {
			fmt.Println("Failed to close redis", err)
		}
	}()

	fmt.Println("Starting server")

	ch := make(chan error, 1) // der typ des channels ist error - es können also error über diesen Channel gesendet werden. Das zweite Argument ist die Buffersize

	// starts new thread of execution
	go func() {
		err = server.ListenAndServe()
		// den Error möchten wir aus der go routine zurück reichen, daher benötigen wir einen channel
		if err != nil {
			// publish a value onto the channel
			ch <- fmt.Errorf("Failed to start server: %w", err)
		}
		close(ch)
	}()

	// select ist switch für channels - man kann auf mehreren channels gleichzeitig hören
	select {
	// reciving the messages from the channel
	case err = <-ch:
		return err
	// hat einen channel drin zum signalisieren, dass der channel geschlossen ist
	case <-ctx.Done():
		timeout, cancel := context.WithTimeout(context.Background(), time.Second*10)
		defer cancel()

		return server.Shutdown(timeout)
	}
}
