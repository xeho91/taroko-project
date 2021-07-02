import ContactsList from "$components/ContactsList/ContactsList";
import { GlobalProvider } from "src/context/GlobalState";
import { FunctionComponent } from "$types";
import React from "react";

const Home: FunctionComponent = () => {
	return (
		<GlobalProvider>
			<h1>Contacts</h1>
			<ContactsList />
		</GlobalProvider>
	);
};

export default Home;
