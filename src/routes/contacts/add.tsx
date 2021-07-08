import { ContactsContext } from "$helpers/ContactsContext";
import { ConfirmDialog, ContactEditor } from "$components";
import React, { Fragment, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { ContactSchema } from "$types";
import type { FormEvent, FunctionComponent } from "react";

type ContactData = Omit<ContactSchema, "id">;

const AddContact: FunctionComponent = () => {
    const history = useHistory();

    const { addContact } = useContext(ContactsContext);
	const [contactData, setContactData] = useState({} as ContactData);
    const [showConfirm, setShowConfirm] = useState(false);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formEl = e.target as HTMLFormElement;
        const formData = new FormData(formEl);

        setContactData({
            first_name: formData.get("first_name") as string,
            last_name: formData.get("last_name") as string,
            job: formData.get("job") as string,
            description: formData.get("description") as string,
        });

		setShowConfirm(true);
    }

	function handleConfirm() {
        addContact(contactData);
        history.push("/");
	}

    return (
        <Fragment>
            <ContactEditor
                action="add"
                onSubmit={handleSubmit}
            />

            {showConfirm
                ? (
                    <ConfirmDialog
                        message={`Are you sure you want to add ${contactData.first_name} ${contactData.last_name} to the list?`}
                        onConfirm={handleConfirm}
                        onDeny={() => setShowConfirm(false)}
                    />
                )
                : null}
        </Fragment>
    );
};

export default AddContact;
