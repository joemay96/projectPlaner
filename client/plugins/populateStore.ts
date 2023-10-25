export default defineNuxtPlugin(nuxtApp => {

	// loading the store
	const techs = useTech()
	const projects = useProject()

	nuxtApp.hook('app:beforeMount', async () => {

		// loading the store
		const techs = useTech()
		const projects = useProject()

		// refetch all data, when the app is reloaded
		try {
			//@ts-ignore
			const data = await nuxtApp.$client.getProjectList();
			//@ts-ignore
			const tData = await nuxtApp.$client.getTechList();
			projects.loadProjects(data.items);
			techs.loadTechs(tData);
		} catch (error) {
			console.error(error);
			//@ts-ignore
			nuxtApp.$createErrorAlert("Error fetch data. Please reload the Page.");
		}
	})

	async function refetchStoreData() {
		// refetch all data, when the app is reloaded
		try {
			//@ts-ignore
			const data = await nuxtApp.$client.getProjectList();
			//@ts-ignore
			const tData = await nuxtApp.$client.getTechList();
			projects.loadProjects(data.items);
			techs.loadTechs(tData);
		} catch (error) {
			console.error(error);
			//@ts-ignore
			nuxtApp.$createErrorAlert("Error fetch data. Please reload the Page.");
		}
	}

	async function deleteStoreData() {
		techs.clearStore();
		projects.clearStore();
	}

	return {
		provide: {
			refetchStoreData,
			deleteStoreData,
		}
	}
})