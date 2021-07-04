import { Form } from "$components";
import { ContactsContext } from "$context";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import type {
    ContactSchema,
    FormEvent,
    FunctionComponent,
    RouteComponentProps,
} from "$types";

interface EditRouteParams {
    id: string;
}

type EditComponentProps = RouteComponentProps<EditRouteParams>;

const EditContact: FunctionComponent<EditComponentProps> = (props) => {
    const { state: { list }, editContact } = useContext(ContactsContext);
    const contactId = parseInt(props.match.params.id);
    const [contactData, setContactData] = useState(list[contactId - 1]);
    const history = useHistory();

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        editContact(contactData);
        history.push("/");
    }

    type EditableContactSchemaKey = keyof Omit<ContactSchema, "id">;
    // FIXME: Make it more strict.
    type EditableContactSchemaValue = string;

    const handleOnChange = (
        key: EditableContactSchemaKey,
        value: EditableContactSchemaValue,
    ) => {
        return setContactData({ ...contactData, [key]: value });
    };

    if (!contactData) {
        return <p>Invalid contact ID.</p>;
    } else {
        return (
            <Form
                onSubmit={handleSubmit}
                firstNameValue={contactData.first_name}
                onFirstNameChange={(e) => handleOnChange("first_name", e.target.value)}
                lastNameValue={contactData.last_name}
                onLastNameChange={(e) => handleOnChange("last_name", e.target.value)}
                jobValue={contactData.job}
                onJobChange={(e) => handleOnChange("job", e.target.value)}
                descriptionValue={contactData.description}
                onDescriptionChange={(e) => handleOnChange("description", e.target.value)}
            />
        );
    }
};

export default EditContact;
