import React, { useState } from 'react'
import { Modal, Button, Text, Input, Loading } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import Axios from 'axios'
import { axiosInstance } from '../helper/axiosInstance'

type TAddBookModal = {
	open: boolean
	handleClose: () => void
	getUpdatedList: () => void
}
type TOneBook = {
	title: string
	authorName: string
	owner: string
	photo?: string
}

export const AddBookModal = ({
	open,
	handleClose,
	getUpdatedList,
}: TAddBookModal) => {
	const [loading, setLoading] = useState(false)
	const { register, handleSubmit } = useForm()

	const onSubmit = async (formData: any) => {
		setLoading(true)
		const currentUser = localStorage.getItem('userId')
		const newBook: TOneBook = {
			title: formData.title,
			authorName: formData?.authorName,
			owner: String(currentUser),
		}

		const data = new FormData()
		const filename = Date.now() + formData.image[0].name
		data.append('name', filename)
		data.append('image', formData.image[0])
		newBook.photo = filename
		try {
			await Axios.post(`${process.env.NEXT_PUBLIC_API_URL}/upload`, data)
		} catch (err) {
			setLoading(false)
			console.log('err', err)
		}

		try {
			setLoading(false)
			const bookRes = await axiosInstance.post(`/books/create`, newBook)
			toast.success(bookRes?.data?.message)
			getUpdatedList()
			setTimeout(() => {
				handleClose()
			}, 1000)
		} catch (err) {
			setLoading(false)
			toast.error(err as string)
		}
	}
	return (
		<Modal
			closeButton
			aria-labelledby='modal-title'
			open={open}
			onClose={handleClose}
			css={{ overflow: 'visible' }}
		>
			<Modal.Header>
				<Text id='modal-title' size={18}>
					Add New Book
				</Text>
			</Modal.Header>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Modal.Body>
					<Input
						clearable
						bordered
						fullWidth
						color='primary'
						size='lg'
						placeholder='Title'
						{...register('title', { required: true })}
					/>
					<Input
						clearable
						bordered
						fullWidth
						color='primary'
						size='lg'
						placeholder='Author Name'
						{...register('authorName', { required: true })}
					/>
					<input type={'file'} {...register('image', { required: true })} />
				</Modal.Body>
				<Modal.Footer
					css={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Button auto type='submit'>
						Create Book
						{loading && (
							<Loading color='secondary' size='xs' css={{ pl: '10px' }} />
						)}
					</Button>
				</Modal.Footer>
				<Toaster />
			</form>
		</Modal>
	)
}
