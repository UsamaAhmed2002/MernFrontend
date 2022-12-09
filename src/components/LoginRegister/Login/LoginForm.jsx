import React, { useEffect, useState } from "react";
import "./Loginform.css";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "./../../../actions/userLoginAction";
import { toast } from "react-toastify";
import Loader from "./../../Loader/Loader";
import { useNavigate, Link } from "react-router-dom";
const LoginForm = () => {
	const dispatch = useDispatch();

	//now handling and dispatching state for login user

	const { loading, error, isAuthenticated } = useSelector(
		(state) => state.user
	);

	//useState for handling user login form
	const [user, setUser] = useState();

	//navigation hook
	const navigate = useNavigate();

	//handler when a user clicks loginbtn
	const handleLogin = (e) => {
		e.preventDefault();
		login(user);
	};

	//handler for onchange input
	const handleLoginUserOnChange = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	//useEffect for initial errors and navigatning
	useEffect(() => {
		if (error) {
			toast.error(error);
			clearErrors();
		}
		if (isAuthenticated) {
			setTimeout(() => {
				navigate(`/account`);
			}, 1000);
		}
	}, [dispatch, error, isAuthenticated]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className="input-box  mt-5">
					<input
						type="email"
						name="email"
						placeholder="Email"
						required
						onChange={handleLoginUserOnChange}
					/>
					<input
						type="password"
						name="password"
						required
						placeholder="Password"
						onChange={handleLoginUserOnChange}
					/>
					<Link className="forgotp" to={"/forgotpassword"}>
						Forgot Password?
					</Link>
					<button type="submit" className="loginbtn" onClick={handleLogin}>
						Log in
					</button>
				</div>
			)}
		</>
	);
};

export default LoginForm;
