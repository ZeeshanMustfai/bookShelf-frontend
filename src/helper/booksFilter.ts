import { TBookMeta } from "@types"

export const booksFilter = (arr: TBookMeta[], status:string) => {
return arr.filter(item => item.status === status)
}