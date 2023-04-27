import { Button } from '@nextui-org/react'
import React from 'react'

type TBookSort = {
	handleSort: (arg: string) => void
}
const BookSort = ({ handleSort }: TBookSort) => {
	return (
		<div className='sortBtn'>
			<Button.Group size='md'>
				<Button onPress={() => handleSort('asc')}>Asc </Button>
				<Button onPress={() => handleSort('dsc')}>Dsc</Button>
			</Button.Group>
		</div>
	)
}

export default BookSort
