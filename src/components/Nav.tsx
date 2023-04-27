import React, { useContext, useState } from 'react'
import { Navbar, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { FaRegMoon, FaSun } from 'react-icons/fa'
import { navItems } from '../mock'
import styles from '../styles/components/navbar.module.scss'
import { MainContext } from '../pages/_app'
import { ThemeContextType } from '../types'
import { AddBookModal } from './AddBookModal'

const mobileNavItem = () => {
	return (
		<>
			{navItems.map(({ id, name }) => (
				<Navbar.CollapseItem key={id} activeColor='primary' color='secondary'>
					{name}
				</Navbar.CollapseItem>
			))}
		</>
	)
}
type TNav = {
	getUpdatedList: () => void
}
const Nav = ({ getUpdatedList }: TNav) => {
	const router = useRouter()
	const { theme, changeTheme } = useContext<ThemeContextType>(MainContext)
	const [open, setOpen] = useState<boolean>(false)
	const handleClose = () => {
		setOpen(!open)
	}

	const handleLogout = () => {
		document.cookie = 'token' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
		localStorage.removeItem('token')
		localStorage.removeItem('user')
		router.push('/login')
	}
	return (
		<Navbar variant='sticky' maxWidth={'md'} disableBlur={true}>
			<Navbar.Toggle showIn='sm' />
			<Navbar.Brand className={styles.brand} onClick={() => router.push('/')}>
				<Text color='primary' size={'$2xl'} css={{ fontWeight: '900' }}>
					Mustfai
				</Text>
			</Navbar.Brand>
			<Navbar.Content className='icon'>
				<Navbar.Item onClick={() => setOpen(true)}>Add Book</Navbar.Item>
				<Navbar.Item onClick={handleLogout}>Logout</Navbar.Item>
				{theme === 'light' ? (
					<FaRegMoon onClick={() => changeTheme('dark')} />
				) : (
					<FaSun onClick={() => changeTheme('light')} />
				)}
			</Navbar.Content>
			<Navbar.Collapse>{mobileNavItem()}</Navbar.Collapse>

			{open && (
				<AddBookModal
					open={open}
					handleClose={handleClose}
					getUpdatedList={getUpdatedList}
				/>
			)}
		</Navbar>
	)
}

export default Nav
