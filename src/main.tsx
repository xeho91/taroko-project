import { ContactsProvider } from "$helpers/ContactsContext";
import { Header } from "$components";
import { AddContact, Contacts, EditContact, Fallback, ViewContact } from "$routes";
import React, { StrictMode } from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./global.scss";

const routes = [
    { path: "/", name: "Contacts List", Component: Contacts },
    { path: "/add", name: "Add new contact", Component: AddContact },
	{ path: "/edit/:id", name: "Edit contact", Component: EditContact },
    { path: "/view/:id", name: "View contact", Component: ViewContact },
	{ path: "*", name: "404 | Not found", Component: Fallback },
];

render(
    <StrictMode>
        <BrowserRouter>
            <ContactsProvider>
                <Header />

                <main>
                    <Switch>
					{routes.map(({ path, Component }) => (
						<Route key={path} exact path={path} component={Component} />
					))}
                    </Switch>
                </main>
            </ContactsProvider>
        </BrowserRouter>
    </StrictMode>,
    document.getElementById("app"),
);
