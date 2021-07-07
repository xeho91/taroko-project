import { ContactsContext } from "$helpers/ContactsContext";
import { ContactEditor } from "$components";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import type { ContactSchema } from "$types";
import type { FormEvent, FunctionComponent } from "react";
import type { RouteComponentProps } from "react-router-dom";

interface EditRouteParams {
    id: string;
}

type EditComponentProps = RouteComponentProps<EditRouteParams>;

type EditableContactSchemaKey = keyof Omit<ContactSchema, "id">;
// FIXME: Make it more strict.
type EditableContactSchemaValue = string;

const EditContact: FunctionComponent<EditComponentProps> = (props) => {
    const history = useHistory();
    const { state: { list }, editContact } = useContext(ContactsContext);
    const contactId = parseInt(props.match.params.id);
    const [contactData, setContactData] = useState(
        list.find(({ id }) => id === contactId),
    );

    if (!contactData) {
        return <p>Invalid contact ID.</p>;
    } else {
        const handleSubmit = (e: FormEvent) => {
            e.preventDefault();
            editContact(contactData);
            history.push("/");
        };

        const handleOnChange = (
            key: EditableContactSchemaKey,
            value: EditableContactSchemaValue,
        ) => {
            return setContactData({ ...contactData, [key]: value });
        };

        return (
            <ContactEditor
                onSubmit={handleSubmit}
                firstNameValue={contactData.first_name}
                onFirstNameChange={(e) =>
                    handleOnChange("first_name", e.target.value)}
                lastNameValue={contactData.last_name}
                onLastNameChange={(e) => handleOnChange("last_name", e.target.value)}
                jobValue={contactData.job}
                onJobChange={(e) => handleOnChange("job", e.target.value)}
                descriptionValue={contactData.description}
                onDescriptionChange={(e) =>
                    handleOnChange("description", e.target.value)}
            />
        );
    }
};

export default EditContact;
