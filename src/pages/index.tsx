/* eslint-disable react-hooks/exhaustive-deps */
import { Inter } from 'next/font/google'
import { useCookies } from 'react-cookie'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import Nav from '@components/Nav'
import BooksMain from '@components/BooksMain'
import { checkUserStatus } from '../helper/checkUserStatus'
import { useCallback } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	const [cookie] = useCookies(['token'])
	const [isUpdated, setUpdated] = useState<boolean>(false)
	useEffect(() => {
		const res = checkUserStatus(cookie)
		if (!res) {
			Router.push('/login')
		}
	}, [cookie])

	const getUpdatedList = useCallback(() => {
		setUpdated(!isUpdated)
	}, [isUpdated])

	return (
		<>
			<Nav getUpdatedList={getUpdatedList} />
			<BooksMain isUpdated={isUpdated} />
		</>
	)
}
