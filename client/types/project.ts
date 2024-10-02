type dbProject = {
	id: string,
	userid: string,
	title: string,
	description: string,
	motivation: string,
	workEstimation: string,
	techStack: [string],
	tags: string,
	created: Date|string|number,
	updated: Date|string|number,
	website?: string,
	github_link?: string,
}

export type {
	dbProject	
}