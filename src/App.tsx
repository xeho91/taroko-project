import Header from "$components/Header/Header";
import React from "react";
import { Route, Switch } from "react-router-dom";

import { AddContact } from "$routes/add";
import { EditContact } from "$routes/edit";
import Home from "$routes/home";
import type { FunctionComponent } from "react";
import { GlobalProvider } from "./context/GlobalState";

const App: FunctionComponent = () => {
	return (
		<GlobalProvider>
			<Header />

			<Switch>
				<Route path="/" component={Home} exact />
				<Route path="/add" component={AddContact} exact />
				<Route path="/edit/:id" component={EditContact} exact />
			</Switch>
		</GlobalProvider>
	);
};

export default App;
