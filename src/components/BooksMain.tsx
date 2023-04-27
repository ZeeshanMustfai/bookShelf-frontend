import { Container, Divider, Grid, Text } from '@nextui-org/react'
import React, { useCallback, useEffect, useState } from 'react'
import BookFilter from './BookFilter'
import BookPreview from './BookPreview'
import BookSort from './BookSort'
import { TBookMeta } from '@types'
import { ascSort, descSort } from '../helper/sorting'
import { axiosInstance } from '../helper/axiosInstance'
import { booksFilter } from '../helper/booksFilter'

type TBooksMain = {
	isUpdated: boolean
	getUpdatedList: () => void
}
type TTitle = {
	children: JSX.Element | string
}
const Title = ({ children }: TTitle) => {
	return (
		<>
			<Text>{children}</Text>
			<Divider />
		</>
	)
}
const BooksMain = ({ isUpdated, getUpdatedList }: TBooksMain) => {
	const [bookList, setBookList] = useState<TBookMeta[]>([])
	const [ptr, setPtr] = useState<TBookMeta[]>([])
	const [inp, setInp] = useState<TBookMeta[]>([])
	const [comp, setComp] = useState<TBookMeta[]>([])

	const handleFilter = useCallback(
		async (search: string) => {
			if (search.length > 2) {
				const res = await axiosInstance.get(`/books/search/${search}`)
				let books = res?.data?.books
				setPtr(booksFilter(books, 'Plan To Read'))
				setInp(booksFilter(books, 'Inprogress'))
				setComp(booksFilter(books, 'Completed'))
			} else {
				getUpdatedList()
			}
		},
		[getUpdatedList]
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
				console.log('res', res.data)
				let books = res?.data?.books
				setPtr(booksFilter(books, 'Plan To Read'))
				setInp(booksFilter(books, 'Inprogress'))
				setComp(booksFilter(books, 'Completed'))
			}
		} catch (e) {
			console.log('e', e)
		}
	}

	useEffect(() => {
		getBookList()
	}, [isUpdated])

	return (
		<Container md css={{ height: '100%' }}>
			<BookFilter handleFilter={handleFilter} />
			<BookSort handleSort={handleSort} />
			<Grid.Container gap={2} className='booksContainer'>
				{ptr.length > 0 && <Title>Plan to read</Title>}
				<div className='booksCategory'>
					{ptr &&
						ptr.map((item) => {
							return (
								<Grid key={item.title} xs={12} sm={6} md={4}>
									<BookPreview
										bookData={item}
										key={item.title}
										getUpdatedList={getUpdatedList}
									/>
								</Grid>
							)
						})}
				</div>
				{inp.length > 0 && <Title>Inprogress</Title>}
				<div className='booksCategory'>
					{inp &&
						inp.map((item) => {
							return (
								<Grid key={item.title} xs={12} sm={6} md={4}>
									<BookPreview
										bookData={item}
										key={item.title}
										getUpdatedList={getUpdatedList}
									/>
								</Grid>
							)
						})}
				</div>
				{comp.length > 0 && <Title>Completed</Title>}
				<div className='booksCategory'>
					{comp &&
						comp.map((item) => {
							return (
								<Grid key={item.title} xs={12} sm={6} md={4}>
									<BookPreview
										bookData={item}
										key={item.title}
										getUpdatedList={getUpdatedList}
									/>
								</Grid>
							)
						})}
				</div>
			</Grid.Container>
		</Container>
	)
}

export default BooksMain
