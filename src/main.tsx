import { Header } from "$components";
import { ContactsProvider } from "$helpers/ContactsContext";
import { AddContact, EditContact, Home, ViewContact } from "$routes";
import React, { StrictMode } from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

import "./global.scss";

render(
    <StrictMode>
        <BrowserRouter>
            <ContactsProvider>
                <Header />

                <main>
                    <Switch>
                        <Route path="/" component={Home} exact />
                        <Route path="/add" component={AddContact} exact />
                        <Route path="/edit/:id" component={EditContact} exact />
                        <Route path="/view/:id" component={ViewContact} exact />
                    </Switch>
                </main>
            </ContactsProvider>
        </BrowserRouter>
    </StrictMode>,
    document.getElementById("app"),
);
