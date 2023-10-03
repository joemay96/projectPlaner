import client from "../plugins/auth/client"

export default defineNuxtRouteMiddleware((to) => {
	if(process.client) {
		if(client.isAuthenticated() && to.path.startsWith("/auth")) {
			return navigateTo("/")
		}
	  }
	})