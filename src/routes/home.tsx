import { ContactsProvider } from "$context";
import { ContactsList } from "$components";
import React from "react";

import { FunctionComponent } from "$types";

const Home: FunctionComponent = () => {
    return (
        <ContactsProvider>
            <h1>Contacts</h1>

            <ContactsList />
        </ContactsProvider>
    );
};

export default Home;
