import { useCookies } from "react-cookie"

export const useToken = () => {
const [cookie] = useCookies(['token'])
const token = cookie?.token
return [token]
}