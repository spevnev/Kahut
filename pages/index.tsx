import type {NextPage} from "next";
import styled from "styled-components";
import {useState} from "react";
import {gql, useApolloClient} from "@apollo/client";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

let changedValues: string[] = [];
const Home: NextPage = () => {
	const client = useApolloClient();
	const [key, setKey] = useState("");
	const [value, setValue] = useState("");


	const get = async () => {
		if (!key.length) return;

		const {data: {get}} = await client.query({
			query: gql` query get($key: String!) { get(key: $key) } `,
			variables: {key},
			fetchPolicy: changedValues.includes(key) ? "network-only" : "cache-first",
		});
		changedValues = changedValues.filter(el => el !== key);

		console.log(get);
	};

	const set = async () => {
		if (!key.length) return;

		await client.mutate({
			mutation: gql` mutation set($key: String!, $value: String!) { set(key: $key, value: $value) } `,
			variables: {key, value},
		});

		changedValues.push(key);
	};


	return (
		<Container>
			<input placeholder="Key" onInput={e => setKey((e.target as HTMLInputElement).value || "")} value={key}/>
			<input placeholder="Value" onInput={e => setValue((e.target as HTMLInputElement).value || "")} value={value}/>

			<button onClick={get}>Get</button>
			<button onClick={set}>Set</button>
		</Container>
	);
};

export default Home;