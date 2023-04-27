import { Container, Grid } from '@nextui-org/react'
import React, { useCallback, useEffect, useState } from 'react'
import BookFilter from './BookFilter'
import BookPreview from './BookPreview'
import BookSort from './BookSort'
import Axios from 'axios'
import { TBookMeta } from '@types'
import { ascSort, descSort } from '../helper/sorting'
import { axiosInstance } from '../helper/axiosInstance'

type TBooksMain = {
	isUpdated: boolean
}
const BooksMain = ({ isUpdated }: TBooksMain) => {
	const [bookList, setBookList] = useState<TBookMeta[]>([])

	const handleFilter = useCallback(
		(data: string) => {
			if (data.length > 2) {
				let dummy = [...bookList]
				const result = dummy.filter((book) =>
					book.title.toLowerCase().includes(data)
				)
				setBookList(result)
			} else {
				setBookList(bookList)
			}
		},
		[bookList]
	)
	const handleSort = useCallback(
		(sort: string) => {
			let dummySort = [...bookList]
			dummySort.sort(sort === 'asc' ? ascSort : descSort)
			setBookList(dummySort)
		},
		[bookList]
	)

	const getBookList = async () => {
		try {
			const res = await axiosInstance.get(`/books`)
			if (res) {
				setBookList(res?.data?.books)
			}
		} catch (e) {
			console.log('e', e)
		}
	}

	useEffect(() => {
		getBookList()
	}, [isUpdated])

	return (
		<Container md>
			<BookFilter handleFilter={handleFilter} />
			<BookSort handleSort={handleSort} />
			<Grid.Container gap={2} className='booksContainer'>
				{bookList.length > 0 ? (
					bookList.map((item) => {
						return (
							<Grid key={item.title} xs={12} sm={6} md={4}>
								<BookPreview bookData={item} key={item.title} />
							</Grid>
						)
					})
				) : (
					<div className='notFound'>Books not found</div>
				)}
			</Grid.Container>
		</Container>
	)
}

export default BooksMain
