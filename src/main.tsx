import { ContactsProvider } from "$helpers/ContactsContext";
import { Header } from "$components";
import { AddContact, Contacts, EditContact, Fallback, ViewContact } from "$routes";
import React, { StrictMode } from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./global.scss";

render(
    <StrictMode>
        <BrowserRouter>
            <ContactsProvider>
                <Header />

                <main>
                    <Switch>
                        <Route path="/" exact component={Contacts} />
                        <Route path="/add" component={AddContact} />
                        <Route path="/edit/:id" component={EditContact} />
                        <Route path="/view/:id" component={ViewContact} />

                        <Route path="*" component={Fallback} />
                    </Switch>
                </main>
            </ContactsProvider>
        </BrowserRouter>
    </StrictMode>,
    document.getElementById("app"),
);
