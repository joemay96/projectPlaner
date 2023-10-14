export default defineNuxtPlugin(nuxtApp => {
	// Doing something with nuxtApp

	const alertMessage = ref('Hey AlertMessage');

	let showErrorAlert = ref(false);
	let showSuccessAlert = ref(false);

	function createSuccessAlert(msg) {
		alertMessage.value = msg;
		showSuccessAlert.value = true;
	}

	function createErrorAlert(msg) {
		console.log('create alert');
		alertMessage.value = msg;
		showErrorAlert.value = true;
	}

	function resetErrorAlert() {
		showErrorAlert.value = false;
	}

	function resetSuccessAlert() {
		showSuccessAlert.value = false;
	}

	return {
		provide: {
			alertMessage,
			createSuccessAlert,
			createErrorAlert,
			resetErrorAlert,
			resetSuccessAlert,
			showErrorAlert,
			showSuccessAlert,
		}
	}
  })