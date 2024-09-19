import type {dbProfile} from "~/types/profile"
import client from "~/plugins/auth/client"

const emptyProfile: dbProfile = {
  id: "",
  // @ts-ignore
  userid: client.getUserLS.id || "",
  firstname: "",
  lastname: "",
  website: "",
  info: "",
  interests: "",
  contact_info: "", 
  status: "",
	created: Date.now().toString(),
	updated: Date.now().toString(),
}

export const useProfile = defineStore('profile', {
	// define the inital state 
  state: () => ({
    profile: emptyProfile,
  }),

  getters: {
    getProfile: (state) => {
      return state.profile
    }
  },

  actions: {
    // update profile
    updateTech(updateProfile: dbProfile){
      this.profile = updateProfile;
    },

    // loads the inital state of the store
    loadProfile(profile: dbProfile) {
      this.profile = profile;
    },

    // Clear the store state
    clearStore() {
      this.profile = emptyProfile;
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTech, import.meta.hot))
}
