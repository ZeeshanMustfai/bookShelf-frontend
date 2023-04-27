export interface BookMetaData {
	id: string
	name: string
	pic: string
	author?:string
	status: string
}

export interface TBookMeta{
	_id: string
	title: string
	photo: string
	authorName: string
	owner: string
	status?: string
	publicationHouse?:string
	publicationDate?: Date
	publicationYear?: string
}


interface BlogDetailProps {
	content: string
	slug: string
	data: BookMetaData
}
export interface HomeProps {
	posts: BlogDetailProps[]
	children: React.ReactNode
}

export type Theme = 'light' | 'dark'
export type ThemeContextType = {
	theme: Theme
	changeTheme: (theme: Theme) => void
}

export type AuthContextType = {
	token: string
	setToken: (arg: string) => void
}