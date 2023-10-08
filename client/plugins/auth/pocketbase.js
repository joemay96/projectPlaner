// import * as dotenv from 'dotenv';
import PocketBase from "pocketbase/cjs"
// import { tech } from "~/types/tech"
// dotenv.config({ path: '../../.env' });
// require("cross-fetch/polyfill");

// TODO: switch to TS for these files

export default class PBClient {
	// TODO: change this to .env variable
	// URL = process.env.POCKETBASE_URL || "http://127.0.0.1:8090";
	URL = "https://pocketbase.sharky.live"

	client = null;

    constructor(nURL) {
        if (nURL) {
            this.URL = nURL;
        }
		this.client = new PocketBase(this.URL)
    }

	getUrl() {
		return this.URL
	}
	
	async authenticate (username, password) {
		try {
			return await this.client.collection("users").authWithPassword(username, password);
		} catch (err) {
			console.log(err);
			return err
		}
	};

	createUserLS(user) {
		localStorage.setItem("user", JSON.stringify({
			id: user.id,
			name: user.name,
			email: user.email,
			username: user.username,
			avatar: user.avatar,
		}))
	}

	isAuthenticated() {
		return this.client.authStore.isValid //&& await pb.collection('users').authRefresh();
	}

	getUserLS = () => {
		try {
			return JSON.parse(localStorage.getItem("user"))
		} catch(err) {
			return {
				id: "",
				name: "",
				email: "",
				username: "",
				avatar: "",
			}
		}
	}

	async refetchUser(id) {
		try {
			console.log(id)
			const res = await this.client.collection('users').getOne(id);
			console.log(res)
			this.createUserLS(res)
		} catch(err) {
			console.error("Error fetching and refreshing Userdata: ", err)
		}
	}

	logout() {
		this.client.authStore.clear()
		localStorage.removeItem("user")
	}

	// Tech routes

	async createTech(newTech) { // type tech
		return await this.client.collection('tech').create(newTech);
	}

	async getTechList() {
		return await this.client.collection('tech').getFullList(200, {
		});
	}

	async getTechById (id) {
		return await this.client.collection('tech').getOne(id)
	}

	async updateTechById (id, updatedTech) {
		return await this.client.collection('tech').update(id, updatedTech);
	}

	async deleteTechById (id) {
		return await this.client.collection('tech').delete(id);
	}

	// Project routes

	async createProject(newProject) { // type tech
		return await this.client.collection('projects').create(newProject);
	}

	async getProjectList() {
		return await this.client.collection('projects').getList(1, 20, {
			// filter: 'created >= "2022-01-01 00:00:00" && someField1 != someField2',
		});
	}

	async getprojectById (id) {
		return await this.client.collection('projects').getOne(id)
	}

	async updateProjectById (id, updatedProject) {
		return await this.client.collection('projects').update(id, updatedProject);
	}

	async deleteProjectById (id) {
		return await this.client.collection('projects').delete(id);
	}

	// User routes

	async updateUser(newUser) {
		let reauthenticate = false;
		const oldUser = this.getUserLS();
		let updateUser = {};
		if(newUser.username != oldUser.username && newUser.username != "") {
			updateUser.username = newUser.username
		}
		if(newUser.email != oldUser.email && newUser.email != "") {
			// updateUser.email = newUser.email;
			// try {
			// 	await this.client.collection('users').authWithPassword(oldUser.email, )
			// 	const res = await this.client.collection('users').requestEmailChange(newUser.email, newUser.password);
			// 	console.log(res)
			// } catch(err) {
			// 	console.error("Error changing email for user:", err);
			// }
		}
		if(newUser.newPassword != "") {
			updateUser.password = newUser.newPassword
			updateUser.passwordConfirm = newUser.newPassword
			updateUser.oldPassword = newUser.password
			reauthenticate = true;
		}

		if(newUser.profileImage) {
			console.log("kommt hier rein?!")
			try {
			 	const res = await this.client.collection('users').update(oldUser.id, {"avatar": newUser.profileImage});
			 	console.log(res)
				this.refetchUser(oldUser.id)
			} catch(err) {
			 	console.error("Error changing profile picture:", err);
			}
		}

		if(updateUser) {
			try {
				const data = JSON.stringify(updateUser)
				const res = await this.client.collection('users').update(oldUser.id, data);
				console.log(oldUser)
				let refetchedUser
				if(reauthenticate) {
					refetchedUser = await this.authenticate(oldUser.email, updateUser.password)
					this.createUserLS(refetchedUser)
				} else {
					await this.refetchUser(oldUser.id)
				}
			} catch(err) {
				console.error("Error updating Userdata: ", err)
			}
		}
	}
}

