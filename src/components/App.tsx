import { Header } from "$components";
import { ContactsProvider } from "$context";
import { AddContact, EditContact, ViewContact, Home } from "$routes";
import React from "react";
import { Route, Switch } from "react-router-dom";

import type { FunctionComponent } from "$types";

const App: FunctionComponent = () => {
    return (
        <ContactsProvider>
            <Header />

            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/add" component={AddContact} exact />
                <Route path="/edit/:id" component={EditContact} exact />
                <Route path="/view/:id" component={ViewContact} exact />
            </Switch>
        </ContactsProvider>
    );
};

export default App;
