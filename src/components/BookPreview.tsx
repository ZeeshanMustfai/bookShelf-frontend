import React from 'react'
import { Card, Text } from '@nextui-org/react'
import { TBookMeta } from '../types'

interface BookPreviewProps {
	bookData: TBookMeta
}

// interface TBooksStatus {
// 	selected: Set<string>
// 	setSelected: React.Dispatch<SetStateAction<Set<string>>>
// 	selectedItem: string
// }
// const BookStatus = ({ selected, setSelected, selectedItem }: TBooksStatus) => {
// 	return (
// 		<Dropdown>
// 			<Dropdown.Button color='secondary' css={{ tt: 'capitalize' }} shadow>
// 				{selectedItem}
// 			</Dropdown.Button>
// 			<Dropdown.Menu
// 				aria-label='Single selection actions'
// 				color='secondary'
// 				disallowEmptySelection
// 				selectionMode='single'
// 				selectedKeys={selected}
// 				onSelectionChange={setSelected}
// 			>
// 				<Dropdown.Item key='Plan To Read'>Plan To Read</Dropdown.Item>
// 				<Dropdown.Item key='Inprogress'>Inprogress</Dropdown.Item>
// 				<Dropdown.Item key='Completed'>Completed</Dropdown.Item>
// 			</Dropdown.Menu>
// 		</Dropdown>
// 	)
// }

const BookPreview = ({ bookData }: BookPreviewProps) => {
	const [selected, setSelected] = React.useState(new Set(['Plan To Read']))

	const selectedItem = React.useMemo(
		() => Array.from(selected).join(', ').replaceAll('_', ' '),
		[selected]
	)

	return (
		<Card>
			<div className='bookStatus'>
				{/* <BookStatus
					selected={selected}
					setSelected={setSelected}
					selectedItem={selectedItem}
				/> */}
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
