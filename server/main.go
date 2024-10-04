package main

import (
	"context"
	"fmt"
	"os"
	"os/signal"

	"github.com/joemay96/projectPlaner/server/app"
)

func main() {
	app := app.New(app.LoadConfig())

	ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt)

	defer cancel()

	err := app.Start(ctx)
	if err != nil {
		fmt.Println("Failed to start app: ", err)
	}
}
