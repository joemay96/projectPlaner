// const delay = (t: number) => new Promise((r) => setTimeout(r, t))
import type {dbProject} from "~/types/project"
import client from "~/plugins/auth/client"

const emptyProject: dbProject = {
  id: "",
  // @ts-ignore
  userid: client.getUserLS.id || "",
  title: "",
  description: "",
  motivation: "",
  workEstimation: "",
  techStack: [""],
  tags: "",
  github_link: "",
  website: "",
  created: Date.now().toString(),
  updated: Date.now().toString(),
}

export const useProject = defineStore('project', {
	// define the inital state 
  state: () => ({
    projects: [] as dbProject[],
  }),

  getters: {
    getProjectById: (state) => {
      return (projectId: String | String[]) => state.projects?.find((t: dbProject) => t.id === projectId) || emptyProject
    },
    getProjects: (state) => {
      return state.projects
    }
  },

  actions: {
    // adding a tech to the list of techs
    addProject(newProject: dbProject) {
      this.projects.push(newProject)
    },

    // delete a tech from the array of tech
    deleteProjectById(projectId: String){
	  let i: number = -1;
      this.projects.forEach((t: dbProject, index) => {
        if(t.id == projectId) {
          i = index;
        }
      })
      if(i !== -1) {
        this.projects.splice(i, 1);
      }
    },

    // update a Tech
    updateProject(updateTech: dbProject){
      this.projects.forEach((p: dbProject, index) => {
        if(p.id === updateTech.id) {
          this.projects[index] = updateTech;
        }
      })
    },

    // loads the inital state of the store
    loadProjects(projects: dbProject[]) {
      this.projects = projects;
    },

    // Clear the store state
    clearStore() {
      this.projects = [];
    },

    // async decrementToZero(interval: number = 300) {
    //   if (this.n <= 0) return

    //   while (this.n > 0) {
    //     this.$patch((state) => {
    //       state.n--
    //       state.decrementedTimes++
    //     })
    //     await delay(interval)
    //   }
    // },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTech, import.meta.hot))
}
