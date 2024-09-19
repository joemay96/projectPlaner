export default defineNuxtPlugin(nuxtApp => {

	// loading the store
	const techs = useTech()
	const projects = useProject()
	const profile = useProfile()

	nuxtApp.hook('app:beforeMount', async () => {

		// loading the store
		const techs = useTech()
		const projects = useProject()
		const profile = useProfile()

		// refetch all data, when the app is reloaded
		try {
			//@ts-ignore
			const data = await nuxtApp.$client.getProjectList();
			//@ts-ignore
			const tData = await nuxtApp.$client.getTechList();
			//@ts-ignore
			const profileData = await nuxtApp.$client.getProfile();
			projects.loadProjects(data.items);
			techs.loadTechs(tData);
			profile.loadProfile(profileData);
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
			//@ts-ignore
			const profileData = await nuxtApp.$client.getProfile();
			projects.loadProjects(data.items);
			techs.loadTechs(tData);
			profile.loadProfile(profileData);
		} catch (error) {
			console.error(error);
			//@ts-ignore
			nuxtApp.$createErrorAlert("Error fetch data. Please reload the Page.");
		}
	}

	async function deleteStoreData() {
		techs.clearStore();
		projects.clearStore();
		profile.clearStore();
	}

	return {
		provide: {
			refetchStoreData,
			deleteStoreData,
		}
	}
})