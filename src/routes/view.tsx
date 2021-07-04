import React, { useContext, useState } from "react";
import { Contact } from "$components";
import { ContactsContext } from "$context";

import type { FunctionComponent, RouteComponentProps } from "$types";

interface ViewRouteParams {
    id: string;
}

type ViewComponentProps = RouteComponentProps<ViewRouteParams>;

const ViewContact: FunctionComponent<ViewComponentProps> = (props) => {
	const contactId = parseInt(props.match.params.id);
    const { state: { list } } = useContext(ContactsContext);
    const [contactData] = useState(list[contactId - 1]);

    if (!contactData) {
        return (
			<p>Invalid contact ID: {contactId}.</p>
		);
    } else {
		return (
			<Contact {...contactData} />
		);
	}
};

export default ViewContact;
