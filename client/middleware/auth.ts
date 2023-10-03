import client from "../plugins/auth/client"

export default defineNuxtRouteMiddleware((to, from) => {
	if(process.client) {
		// if(client.isAuthenticated() && to.path.startsWith("/auth")) {
		// 	return navigateTo("/")
		// }

		if (!client.isAuthenticated()) {
			return navigateTo("/auth")
		}
	  }
	})