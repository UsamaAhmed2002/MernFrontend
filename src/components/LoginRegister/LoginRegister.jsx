import React, { useEffect, useState } from "react";
import LoginForm from "./Login/LoginForm";
import "./LoginRegister.css";
import RegisterForm from "./REgister/RegisterForm";
const LoginRegister = () => {
	const [form, setForm] = useState("registerForm");

	const handleFacebookLogin = () => {
		FB.login(
			(response) => {
				console.log(response);
			},
			{ scope: "public_profile,email" }
		);
	};

	useEffect(() => {
		window.fbAsyncInit = function () {
			FB.init({
				appId: "5701241519930154",
				cookie: true,
				xfbml: true,
				version: "v15.0",
			});
		};
	}, []);
	return (
		<>
			<div className="mainContainer">
				<div className="formContainer">
					<div className="buttons ">
						<button onClick={() => setForm("LoginForm")} className="login-btn">
							Login
						</button>
						<button
							onClick={() => setForm("registerForm")}
							className="register-btn"
						>
							SignUp
						</button>
						<button onClick={handleFacebookLogin}>Login With Facebook</button>
					</div>
					{form === "LoginForm" ? <LoginForm /> : <RegisterForm />}
				</div>
			</div>
		</>
	);
};

export default LoginRegister;
