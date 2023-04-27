import { Text } from '@nextui-org/react'
import React from 'react'

interface TError {
	children: JSX.Element | string
}

export const errorStyle = {
	color: 'red',
	fontSize: '10px',
	mt: '3px',
}

const Error = ({ children }: TError) => {
	return <Text css={errorStyle}>{children}</Text>
}

export default Error
