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
	image: File | null | string,
	url: URL | string | null,
	collectionId?: string,
	collectionName?: string,
	created?: Date|string,
	updated?: Date|string,
}

export type {
	tech,
	dbTech
}