import { ContactEditor } from "$components";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { ContactsContext } from "$helpers/ContactsContext";

import type { FormEvent, FunctionComponent } from "react";
import type { RouteComponentProps } from "react-router-dom";

const AddContact: FunctionComponent<RouteComponentProps> = () => {
    const history = useHistory();

	const { addContact } = useContext(ContactsContext);

	const [first_name, setFirstName] = useState("");
	const [last_name, setLastName] = useState("");
	const [job, setJob] = useState("");
	const [description, setDescription] = useState("");

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const newContact = {
            first_name,
            last_name,
            job,
            description,
        };

        addContact(newContact);
        history.push("/");
    }

    return (
        <ContactEditor
			onSubmit={handleSubmit}

			firstNameValue={first_name}
			onFirstNameChange={(e) => setFirstName(e.target.value)}

			lastNameValue={last_name}
			onLastNameChange={(e) => setLastName(e.target.value)}

			jobValue={job}
			onJobChange={(e) => setJob(e.target.value)}

			descriptionValue={description}
			onDescriptionChange={(e) => setDescription(e.target.value)}
		/>
    );
};

export default AddContact;
