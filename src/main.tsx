import { ContactsProvider } from "$helpers/ContactsContext";
import { Header } from "$components";
import { AddContact, Contacts, EditContact, ViewContact } from "$routes";
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
                        <Route path="/contacts" component={Contacts} exact />
                        <Route path="/contacts/add" component={AddContact} exact />
                        <Route path="/contacts/edit/:id" component={EditContact} exact />
                        <Route path="/contacts/view/:id" component={ViewContact} exact />
                    </Switch>
                </main>
            </ContactsProvider>
        </BrowserRouter>
    </StrictMode>,
    document.getElementById("app"),
);
