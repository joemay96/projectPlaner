// import * as dotenv from 'dotenv';
import PocketBase from "pocketbase/cjs"
// dotenv.config({ path: '../../.env' });
// require("cross-fetch/polyfill");


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
			name: user.name,
			email: user.email,
			username: user.username,
			imagePath: user.imagePath,
		}))
	}

	isAuthenticated() {
		return this.client.authStore.isValid //&& await pb.collection('users').authRefresh();
	}

	getUserLS = () => {
		return localStorage.getItem("user")
	}

	logout() {
		this.client.authStore.clear()
		localStorage.removeItem("user")
	}
}

