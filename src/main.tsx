import { ContactsProvider } from "$helpers/ContactsContext";
import { Header } from "$components";
import { AddContact, Contacts, EditContact, ViewContact, Fallback } from "$routes";
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
                        <Route path="/" component={Contacts} exact />
                        <Route path="/add" component={AddContact} exact />
                        <Route path="/edit/:id" component={EditContact} exact />
                        <Route path="/view/:id" component={ViewContact} exact />

                        <Route path="*" component={Fallback} exact />
                    </Switch>
                </main>
            </ContactsProvider>
        </BrowserRouter>
    </StrictMode>,
    document.getElementById("app"),
);
