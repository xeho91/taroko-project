import { ContactEditor } from "$components";
import React from "react";

import type { FunctionComponent } from "react";

const AddContact: FunctionComponent = () => {
    return (
        <ContactEditor action="add" />
    );
};

export default AddContact;
