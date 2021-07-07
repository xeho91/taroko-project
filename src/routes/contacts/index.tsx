import { ContactsList } from "$components";
import React, { Fragment } from "react";

import { FunctionComponent } from "react";

const Contacts: FunctionComponent = () => {
    return (
        <Fragment>
            <h1>Contacts</h1>

            <ContactsList />
        </Fragment>
    );
};

export default Contacts;
