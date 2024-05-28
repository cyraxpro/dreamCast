import { Container, Button, Form, Row, Col, Spinner, Table, Image, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect, useState } from 'react';


function App() {

	const [isLoading, setIsLoading] = useState(false);
	const [users, setUsers] = useState([]);
	const [addUserError, setAddUserError] = useState(null);
	const REQUIRED_MSG = 'This is a required field';

	const { register, handleSubmit, reset, formState: { errors } } = useForm();

	const Loader = <Spinner animation="grow" role="status" size="sm">
		<span className="visually-hidden">Loading...</span>
	</Spinner>;

	const displayErrorSpan = (error) => {
		return error && <span className='text-danger'>{error.message}</span>
	}

	useEffect(() => {
		getAllUsers();
	}, []);

	// APIs

	const submitUserData = async (data) => {
		setIsLoading(true);
		console.log("dat >", data);
		data.profile_img = data.profile_img[0];
		setAddUserError(null);
		try {
			await axios.post(`${process.env.REACT_APP_API_URL}/save-user`, data, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			getAllUsers();
			reset();
			// console.log("response >>", response);
		} catch (error) {
			console.log("Some error occurred", error);
			error?.response?.data?.errors?.email && setAddUserError(error.response.data.errors.email[0]);
		} finally {
			setIsLoading(false);
		}
	}

	const getAllUsers = async () => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_API_URL}/get-user`);
			setUsers(response.data.data);
		} catch (error) {
			console.log("Some error occurred", error);
		}
	}

	return (
		<div>
			<Container className='py-5'>
				<Row>
					<Col md={5}>
						<h2 className='mb-2'>Add User</h2>
						{addUserError && <Alert key={'danger'} variant={'danger'}>
							{addUserError}
						</Alert>}
						<Form onSubmit={handleSubmit(submitUserData)}>
							<Form.Group className="mb-3" controlId="formBasicName">
								<Form.Label>Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter name"
									{...register('name', {
										required: REQUIRED_MSG,
										minLength: {
											value: 2,
											message: 'Please enter at least 2 characters'
										},
										maxLength: {
											value: 15,
											message: 'Please enter at most 15 character'
										},
									})}
								/>
								{displayErrorSpan(errors.name)}
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Email</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter email"
									{...register('email', {
										required: REQUIRED_MSG,
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
											message: "Invalid email address"
										}
									})}
								/>
								{displayErrorSpan(errors.email)}
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicPhone">
								<Form.Label>Phone</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter phone"
									{...register('phone', {
										required: REQUIRED_MSG,
										pattern: {
											value: /^[789]\d{9}$/,
											message: "Invalid phone no"
										}
									})}
								/>
								{displayErrorSpan(errors.phone)}
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicDescription">
								<Form.Label>Description</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter description"
									{...register('description', {
										required: REQUIRED_MSG,
										minLength: {
											value: 2,
											message: 'Please enter at least 2 characters'
										},
										maxLength: {
											value: 100,
											message: 'Please enter at most 100 character'
										},
									})}
								/>
								{displayErrorSpan(errors.description)}
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicImage">
								<Form.Label>Profile Image</Form.Label>
								<Form.Control
									type="file"
									{...register('profile_img', {
										required: REQUIRED_MSG,
									})}
								/>
								{displayErrorSpan(errors.profile_img)}
							</Form.Group>

							<Button variant="primary" type="submit" disabled={isLoading}>
								{isLoading && Loader}
								&nbsp;Submit
							</Button>
						</Form>

					</Col>
					<Col md={7}>
						<h2 className='mb-4'>All Users</h2>
						<Table striped bordered hover>
							<thead>
								<tr>
									<th>#</th>
									<th>Name</th>
									<th>Email</th>
									<th>Phone</th>
									<th>Description</th>
									<th>Profile Image</th>
								</tr>
							</thead>
							<tbody>
								{users.length > 0 ? users.map((user, index) =>
									<tr key={index}>
										<td>{index + 1}</td>
										<td>{user.name}</td>
										<td>{user.email}</td>
										<td>{user.phone}</td>
										<td>{user.description}</td>
										<td>
											<Image style={{ width: '40px' }} src={`${process.env.REACT_APP_SITE_URL}/${user.profile_img}`} />
										</td>
									</tr>) : <tr><td className="text-center" colSpan={6}>No User found</td></tr>}
							</tbody>
						</Table>
					</Col>
				</Row>
			</Container>
		</div>

	);
}

export default App;
