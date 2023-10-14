import client from "./client"
/*
Update the user Status for the whole app. Mainly for updating purpose of the AppHeader variable
*/
export default defineNuxtPlugin(nuxtApp => {

	let userStatus = ref(false);
	
	// hook to get the page state after refreshing the page
	nuxtApp.hook('app:beforeMount', () => {
		const user = client.getUserLS();
		if(user) {
			userStatus.value = true
		} else {
			userStatus.value = false;
		}
	})

	function updateUserStatus(newStatus) {
		userStatus.value = newStatus;
	}

	return {
		provide: {
			userStatus,
			updateUserStatus,
		}
	}
  })