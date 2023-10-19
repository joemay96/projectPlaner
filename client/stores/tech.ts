import {dbTech} from "~/types/tech"

export const useTech = defineStore('tech', {
	// define the inital state 
  state: () => ({
    techs: [] as dbTech[],
  }),

  getters: {
    getTechById: (state) => {
      return (techId: String) => state.techs?.find((t: dbTech) => t.id === techId)
    },
    getTechs: (state) => {
      return state.techs
    }
  },

  actions: {
    // adding a tech to the list of techs
    addTech(newTech: dbTech) {
      this.techs.push(newTech)
    },

    // delete a tech from the array of tech
    deleteTechById(techId: String){
      let i: number = -1;
      this.techs.forEach((t: dbTech, index) => {
        if(t.id == techId) {
          i = index;
        }
      })
      if(i !== -1) {
        this.techs.splice(i, 1);
      }
    },

    // update a Tech
    updateTech(updateTech: dbTech){
      this.techs.forEach((t: dbTech, index) => {
        if(t.id === updateTech.id) {
          this.techs[index] = updateTech;
        }
      })
    },

    // loads the inital state of the store
    loadTechs(techs: dbTech[]) {
      this.techs = techs;
    }
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTech, import.meta.hot))
}
