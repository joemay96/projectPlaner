import type {dbProfile} from "~/types/profile"
import client from "~/plugins/auth/client"

const emptyProfile: dbProfile = {
  id: "",
  // @ts-ignore
  userid: client.getUserLS.id || "",
  f_name: "",
  l_name: "",
  website: "",
  info: "",
  interests: "",
  contact_info: "", 
  status: "",
  show: false,
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
    updateProfile(updateProfile: dbProfile){
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
