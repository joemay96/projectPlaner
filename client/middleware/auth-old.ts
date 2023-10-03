import client from "../plugins/auth/client"

export default defineNuxtRouteMiddleware((to, from) => {
	console.log(client.isAuthenticated())
	  if(process.client) {
		// if (to.path === '/auth' && from.path !== "/auth") {
		// 	//refresh application
		// 	window.location.replace("/auth");
		// }
		// if(to.path == "/" && from.path == "/auth") {
		// 	//refresh application
		// 	window.location.replace("/");
		// }

		if(to.path != "/auth" && client.)
		// if (client.isAuthenticated() && to.path !== "/auth") {
		// 	// return navigateTo(to.fullPath) // --> funktioniert irgendwie nicht...
		// 	return true
		// } else if(to.path !== "/auth") {
		// 	// TODO: open flash that user has to log in
		// 	return navigateTo("/auth")
		// } else {
		// 	return navigateTo("/")
		// }
	  }
	})