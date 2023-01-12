import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row, Toast } from "reactstrap";
import { clearErrors, getUserDetails } from "../../actions/userLoginAction";
import Loader from "../Loader/Loader";
import "./Account.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CLEAR_ERRORS } from "../../constants/productConstants";
const Account = () => {
	//hooks
	const navigate = useNavigate();
	const dispatch = useDispatch();

	//getting state when user is logged in
	const {
		user = {},
		loading = true,
		error,
	} = useSelector((state) => state.user);

	//handler when a user clicks profile edit btn
	const handleEditProfileBtn = (e) => {
		e.preventDefault();
		navigate("/editprofile");
	};

	//handler when a user clicks orders btn
	const handleOrdersBtn = (e) => {
		e.preventDefault();
		navigate("/orders");
	};

	//handler when a user clicks change password btn
	const handleChangePasswordBtn = (e) => {
		e.preventDefault();
		navigate("/updatepassword");
	};

	//use Effect used when the page is renderd
	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch({ type: CLEAR_ERRORS });
		}
		dispatch(getUserDetails());
	}, [dispatch]);
	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<Container fluid="sm">
					<Row xs={1} sm={2} md={2}>
						<Col>
							<div className="detailsBox">
								<div>
									<h1>Full Name</h1>
									<p>{user && user.name}</p>
								</div>
								<div>
									<h1>Email</h1>
									<p>{user && user.email}</p>
								</div>
								<div>
									<h1>Joined-On</h1>
									<p>{user && user.createdAt}10-22-2022</p>
								</div>
							</div>
						</Col>
						<Col>
							<div className="editProfileBox">
								<button onClick={handleOrdersBtn}>My Orders</button>
								<button onClick={handleEditProfileBtn}>Edit Profile</button>
								<button onClick={handleChangePasswordBtn}>
									Change Password
								</button>
							</div>
						</Col>
					</Row>
				</Container>
			)}
		</>
	);
};

export default Account;
