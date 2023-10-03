export default defineNuxtPlugin(() => {
	addRouteMiddleware("refresh-auth", (to, from) => {
	  if(process.client) {
		if (to.path === '/auth' && from.path !== "/auth") {
			//refresh application
			window.location.replace("/auth");
		}
		if(to.path == "/" && from.path == "/auth") {
			//refresh application
			window.location.replace("/");
		}
	  }
	})
  })