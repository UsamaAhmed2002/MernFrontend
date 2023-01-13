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
				window.Fb.api(`/${response.userID}`, function (response) {
					console.log(`hello $response.name`);
				});
			},
			{ scope: "public_profile,email" }
		);
	};

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
						<div
							className="fb-login-button"
							data-width=""
							data-size="medium"
							data-button-type="continue_with"
							data-layout="default"
							data-auto-logout-link="true"
							data-use-continue-as="true"
						></div>
					</div>
					{form === "LoginForm" ? <LoginForm /> : <RegisterForm />}
				</div>
			</div>
		</>
	);
};

export default LoginRegister;
