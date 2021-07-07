import { ContactsContext } from "$helpers/ContactsContext";
import { Contact, Loader } from "$components";
import React, { useContext, useState, useEffect } from "react";

import type { ContactSchema } from "$types";
import type { FunctionComponent } from "react";
import type { RouteComponentProps } from "react-router-dom";

interface ViewRouteParams {
    id: string;
}

type ViewComponentProps = RouteComponentProps<ViewRouteParams>;

const ViewContact: FunctionComponent<ViewComponentProps> = (props) => {
    const contactId = parseInt(props.match.params.id);
    const { isProcessing, state: { list } } = useContext(ContactsContext);
    const [contactData, setContactData] = useState<ContactSchema>();

	useEffect(() => {
		if (!contactData) {
			setContactData(list.find(({ id }) => id === contactId));
		}
	}, [contactData, list, contactId]);

    if (isProcessing) {
        return (
            <Loader message="Please wait, fetching contact data..." />
        );
    } else {
        if (!contactData) {
            return (
                <p>Invalid contact ID: {contactId}.</p>
            );
        } else {
            return (
                <Contact {...contactData} />
            );
        }
    }
};

export default ViewContact;
