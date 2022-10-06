import React from "react";
import {NextPage} from "next";
import Form, {FormOnSubmitCallback} from "../components/login/Form";

const Signup: NextPage = () => {
	const onSubmit: FormOnSubmitCallback = (inputs, showError) => {
		if (inputs["username"].length < 4) return showError("Username can't be shorter than 4!");
		if (inputs["username"].length > 30) return showError("Username can't be longer than 30!");
		if (inputs["password"].length < 4) return showError("Password can't be shorter than 4!");
		if (inputs["password"].length > 30) return showError("Password can't be longer than 30!");
		if (inputs["confirm"] !== inputs["password"]) return showError("Passwords don't match!");

		// TODO
	};

	return <Form title="Sign up" subtitle="Already have an account?" link={{text: "Log in", href: "/login"}} onSubmit={onSubmit}
				 inputs={[{text: "username"}, {text: "password", isSecret: true}, {text: "Confirm password", key: "confirm", isSecret: true}]}/>;
};

export default Signup;