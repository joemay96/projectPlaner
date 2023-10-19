type dbProject = {
	id: string,
	userid: string,
	title: string,
	description: string,
	motivation: string,
	workEstimation: string,
	techStack: [string],
	tags: string,
	created?: Date|string,
	updated?: Date|string,
}

export type {
	dbProject	
}