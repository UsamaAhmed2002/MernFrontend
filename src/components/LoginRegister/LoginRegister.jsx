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
	function checkLoginState() {
		// Called when a person is finished with the Login Button.
		FB.getLoginStatus(function (response) {
			// See the onlogin handler
			statusChangeCallback(response);
		});
	}
	checkLoginState();
	function statusChangeCallback(response) {
		// Called with the results from FB.getLoginStatus().
		console.log("statusChangeCallback");
		console.log(response); // The current login status of the person.
		if (response.status === "connected") {
			// Logged into your webpage and Facebook.
			testAPI();
		} else {
			// Not logged into your webpage or we are unable to tell.

			console.log("not logged into web page");
		}
	}

	function testAPI() {
		// Testing Graph API after login.  See statusChangeCallback() for when this call is made.
		console.log("Welcome!  Fetching your information.... ");
		FB.api("/862788814970259", function (response) {
			console.log("Successful login for: " + response.name);
			document.getElementById("status").innerHTML =
				"Thanks for logging in, " + response.name + "!";
		});
	}

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
