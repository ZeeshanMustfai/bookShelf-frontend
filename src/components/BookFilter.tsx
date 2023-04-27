import React from 'react'
import { Input } from '@nextui-org/react'

type TBookFilter = {
	handleFilter: (arg: string) => void
}

const BookFilter = ({ handleFilter }: TBookFilter) => {
	return (
		<div className='booksFilter'>
			<Input
				labelPlaceholder='Search'
				rounded
				size='lg'
				onChange={(e) => handleFilter(e.target.value)}
			/>
		</div>
	)
}

export default BookFilter
