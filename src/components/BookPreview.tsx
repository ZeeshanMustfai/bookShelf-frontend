import React, { useCallback, useEffect, useState } from 'react'
import { Card, Dropdown, Text } from '@nextui-org/react'
import { TBookMeta } from '../types'
import { axiosInstance } from '../helper/axiosInstance'
import toast, { Toaster } from 'react-hot-toast'

interface BookPreviewProps {
	bookData: TBookMeta
	getUpdatedList: VoidFunction
}

interface TBooksStatus {
	selectedItem: string | undefined
	handleChange: (arg: React.ChangeEvent<HTMLSelectElement>) => void
}
const BookStatus = ({ selectedItem, handleChange }: TBooksStatus) => {
	return (
		<select value={selectedItem} onChange={handleChange}>
			<option value='Plan To Read'>Plan To Read</option>
			<option value='Inprogress'>Inprogress</option>
			<option value='Completed'>Completed</option>
		</select>
	)
}

const BookPreview = ({ bookData, getUpdatedList }: BookPreviewProps) => {
	const [selectedItem, setSelectedItem] = useState(bookData?.status)

	const handleChange = useCallback(
		async (event: React.ChangeEvent<HTMLSelectElement>) => {
			setSelectedItem(event.target.value)

			try {
				const res = await axiosInstance.put('/books/update', {
					id: bookData?._id,
					status: event.target.value,
				})
				if (res.status === 200) {
					toast.success(res.data.message)
					getUpdatedList()
				}
			} catch (err) {
				toast.error('Some thing went wrong!')
			}
		},
		[bookData?._id, getUpdatedList]
	)

	return (
		<Card>
			<div className='bookStatus'>
				<BookStatus selectedItem={selectedItem} handleChange={handleChange} />
			</div>
			<Card.Body css={{ p: 0, m: 0 }}>
				<Card.Image
					objectFit='cover'
					src={process.env.NEXT_PUBLIC_PF + bookData?.photo}
					width={'100%'}
					height={200}
				/>
			</Card.Body>
			<Card.Footer
				css={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
				}}
			>
				<Text css={{ fontSize: '$2xl' }}>{bookData?.title}</Text>
				<div className='datePreview'>
					<Text>{bookData?.authorName}</Text>
					<Text>{bookData?.publicationYear}</Text>
				</div>
			</Card.Footer>
		</Card>
	)
}

export default BookPreview
