import React, { useState } from 'react'
import {
	Button,
	Card,
	Container,
	Input,
	Loading,
	Spacer,
	Text,
} from '@nextui-org/react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import Axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import Router from 'next/router'
import Error from '@components/Error'

const SignUp = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm()

	const onSubmit = (data: any) => {
		setLoading(true)
		Axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/signup`, data, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => {
				if (res.status === 200) {
					toast.success(res?.data?.message)
					Router.push('/login')
				}
				setLoading(false)
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
	return (
		<Container md>
			<div className='loginContainer'>
				<Card className='loginCard'>
					<Text size={'$2xl'}>Signup</Text>
					<Spacer y={1} />
					<form onSubmit={handleSubmit(onSubmit)}>
						<Input
							bordered
							labelPlaceholder='email'
							color='primary'
							fullWidth
							{...register('email', { required: true })}
							name='email'
							{...(errors.email && <Error>Email is required.</Error>)}
						/>
						<Spacer y={1.5} />
						<Input.Password
							bordered
							labelPlaceholder='password'
							color='primary'
							{...register('password', { required: true })}
							{...(errors.password && <Error>Password is required.</Error>)}
						/>
						<Spacer y={1.5} />
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Button bordered auto rounded type='submit'>
								Signup
								{loading && (
									<Loading color='primary' size='xs' css={{ pl: '10px' }} />
								)}
							</Button>
						</div>
						<Spacer y={1.5} />
						<Text>
							If you have already an account{' '}
							<Link className='loginLink' href='/login'>
								Login
							</Link>
						</Text>
					</form>
				</Card>
				<Toaster />
			</div>
		</Container>
	)
}

export default SignUp
