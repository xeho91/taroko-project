import { ContactsContext } from "$helpers/ContactsContext";
import { ContactEditor, Loader } from "$components";
import React, { useContext, useEffect, useState } from "react";

import type { ContactSchema } from "$types";
import type { FunctionComponent } from "react";
import type { RouteComponentProps } from "react-router-dom";

interface EditRouteParams {
    id: string;
}

type EditComponentProps = RouteComponentProps<EditRouteParams>;

const EditContact: FunctionComponent<EditComponentProps> = (props) => {
    const endpointId = parseInt(props.match.params.id);

    const { getContact } = useContext(ContactsContext);

    const [contactData, setContactData] = useState<ContactSchema>();
    const [status, setStatus] = useState("Idle");

    useEffect(() => {
        if (!contactData && status === "Idle") {
            setStatus("Processing");

            void (async function() {
                try {
                    setContactData(await getContact(endpointId));
                    setStatus("Fetched");
                } catch (err) {
                    setStatus(err.message);
                }
            })();
        }
    }, [contactData, endpointId, getContact, status]);

    if (status === "Processing") {
        return (
            <Loader message="Please wait, receiving contact data..." />
        );
    } else if (status === "Fetched") {
        return (
            <ContactEditor action="edit" data={contactData!} />
        );
    } else {
        return (
            <p>{status}</p>
        );
    }
};

export default EditContact;
