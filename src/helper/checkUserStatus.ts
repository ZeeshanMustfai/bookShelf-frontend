export const checkUserStatus = (cookie: any) => {
	if (Object.keys(cookie).length === 0) {
		return false
	}
	return true
}