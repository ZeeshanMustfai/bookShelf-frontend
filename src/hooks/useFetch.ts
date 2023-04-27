import { useEffect, useState } from 'react'

const useFetch = (url: string) => {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		fetch(url)
			.then((res) => res.json())
			.then((result) => {
				setError(result.error)
				setData(result)
				setLoading(false)
			})
	}, [url])

	return { data, loading, error }
}

export default useFetch
