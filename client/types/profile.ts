type dbProfile = {
	id: string,
	collectionId: string,
	userid: string,
	f_name?: string,
	l_name?: string,
	avatar?: File | null,
	website?: string,
	info?: string,
	interests?: string,
	contact_info?: string,
	status?: string,
	show?: boolean,
	created?: Date|string,
	updated?: Date|string,
}

export type {
	dbProfile,
}