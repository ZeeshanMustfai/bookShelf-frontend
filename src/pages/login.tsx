import {
	Button,
	Card,
	Container,
	Input,
	Loading,
	Spacer,
	Text,
} from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Axios from 'axios'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
import Router from 'next/router'
import { useCookies } from 'react-cookie'
import Error from '@components/Error'
import { checkUserStatus } from '../helper/checkUserStatus'

const url = process.env.NEXT_PUBLIC_API_URL

const Login = () => {
	const [cookie, setCookie, cookies] = useCookies(['token'])
	const [loading, setLoading] = useState<boolean>(false)
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm()

	const onSubmit = (data: any) => {
		setLoading(true)
		Axios.post(`${url}/user/login`, data, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => {
				if (res.status === 200) {
					setLoading(false)
					toast.success(res?.data?.message)
					localStorage.setItem('token', res?.data?.token)
					localStorage.setItem('userId', res?.data?.user)
					setCookie('token', res.data.token, { path: '/' })
					Router.push('/')
				}
			})
			.catch((err) => {
				setLoading(false)
				let errorList = err?.response?.data?.errors
				if (errorList?.email) {
					toast.error(errorList?.email)
				} else {
					toast.error(errorList?.password)
				}
			})
	}

	useEffect(() => {
		const res = checkUserStatus(cookie)
		if (res) {
			Router.push('/')
		}
	}, [cookie])

	return (
		<Container md>
			<div className='loginContainer'>
				<Card className='loginCard'>
					<Text size={'$2xl'}>Login</Text>
					<Spacer y={1.5} />
					<form onSubmit={handleSubmit(onSubmit)}>
						<Input
							fullWidth
							bordered
							labelPlaceholder='email'
							color='primary'
							{...register('email', { required: true })}
							name='email'
						/>
						{errors.email && <Error>Email is required</Error>}
						<Spacer y={1.5} />
						<Input.Password
							bordered
							labelPlaceholder='password'
							color='primary'
							{...register('password', { required: true })}
						/>
						{errors.password && <Error>Password is required</Error>}
						<Spacer y={1.5} />
						<div className='submit'>
							<Button bordered auto rounded type='submit'>
								Login
								{loading && (
									<Loading color='primary' size='xs' css={{ pl: '10px' }} />
								)}
							</Button>
						</div>
						<Spacer y={1.5} />
						<Text>
							{`If you don't have account`}
							<Link className='loginLink' href='/signup'>
								Register Here
							</Link>
						</Text>
					</form>
				</Card>
				<Toaster />
			</div>
		</Container>
	)
}

export default Login
