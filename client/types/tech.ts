type tech =  {
	name: String,
	area: String,
	image: File | null,
}

type dbTech = {
	id: string,
	userid: string,
	name: string,
	area: string,
	image: File | null,
	url: URL | string | null,
	collectionId?: string,
	collectionName?: string,
	created?: Date,
	updated?: Date,
}

export type {
	tech,
	dbTech
}