import styled from "styled-components";
import {color} from "../../utils/globalStyles";
import React, {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	width: 100vw;
	max-width: 1280px;
	min-width: 400px;
	height: 75vh;
	padding-top: 20vh;
`;

const Column = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 50%;
`;

const Title = styled.h1`
	font-size: 60px;
	font-weight: 100;
	color: ${color("white0")};
`;

const SubTitle = styled.h2`
	font-size: 18px;
	font-weight: 200;
	color: ${color("white1")};
`;

const TextLink = styled.div`
	display: inline;
	font-size: 18px;
	font-weight: 300;
	cursor: pointer;
	text-decoration: underline;
	color: ${color("frost4")}
`;

const Input = styled.input`
	width: 100%;
	background: ${color("black0")};
	outline: none;
	border: none;
	border-radius: 5px;
	padding: 6px 10px;
	font-size: 16px;
	color: ${color("white2")};
	box-shadow: inset 1px 2px 3px rgba(0, 0, 0, 0.3);
	margin: 4px 0;

	&::placeholder {
		color: ${color("gray")}
	}
`;

const Button = styled.button`
	margin-top: 4px;
	padding: 4px 16px;
	border: none;
	border-radius: 3px;
	font-size: 16px;
	cursor: pointer;
	transition: background-color .2s;
	background: ${color("frost1")};
	color: ${color("white1")};

	&:hover {
		background: ${color("frost0")};
	}
`;

const ErrorMessage = styled.p`
	font-size: 16px;
	color: ${color("red")};
`;

export type FormOnSubmitCallback = (inputs: { [key: string]: string }, showError: (message: string) => void) => void;

type Props = {
	inputs: { key?: string, text: string, isSecret?: boolean }[],
	onSubmit: FormOnSubmitCallback,
	title: string,
	subtitle: string,
	link: { href: string, text: string },
}

const ERROR_DURATION = 3000;

const Form = ({title, subtitle, link: {href, text: linkText}, inputs, onSubmit}: Props) => {
	const router = useRouter();
	const [values, setValues] = useState<{ [key: string]: string }>(inputs.reduce((obj, val) => ({...obj, [val.key || val.text]: ""}), {}));
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const timeout = useRef<NodeJS.Timeout | undefined>(undefined);

	useEffect(() => () => void (timeout.current && clearTimeout(timeout.current)), []);


	const showError = (message: string) => {
		setErrorMessage(message);

		if (timeout.current) clearTimeout(timeout.current);
		timeout.current = setTimeout(() => {
			setErrorMessage(null);
			timeout.current = undefined;
		}, ERROR_DURATION);
	};


	return (
		<Container>
			<Column>
				<Title>{title}</Title>
				<SubTitle>{subtitle} <TextLink onClick={() => router.push(href)}>{linkText}</TextLink></SubTitle>
			</Column>

			<Column>
				{inputs.map(({key, text, isSecret}) =>
					<Input type={isSecret ? "password" : "text"} key={key || text} placeholder={text.slice(0, 1).toUpperCase() + text.slice(1)} value={values[key || text]}
						   onInput={e => setValues({...values, [key || text]: (e.target as HTMLInputElement).value})}/>,
				)}

				<ErrorMessage style={errorMessage ? {} : {opacity: 0}}>{errorMessage || "."}</ErrorMessage>
				<Button onClick={() => onSubmit(values, showError)}>Sign up</Button>
			</Column>
		</Container>
	);
};

export default Form;