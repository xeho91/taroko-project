import { ContactsContext } from "$helpers/ContactsContext";
import { ConfirmDialog, ContactEditor, Loader } from "$components";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import type { ContactSchema } from "$types";
import type { FormEvent, FunctionComponent } from "react";
import type { RouteComponentProps } from "react-router-dom";

interface EditRouteParams {
    id: string;
}

type EditComponentProps = RouteComponentProps<EditRouteParams>;

const EditContact: FunctionComponent<EditComponentProps> = (props) => {
    const contactId = parseInt(props.match.params.id);
    const history = useHistory();

    const { state, isProcessing, editContact } = useContext(ContactsContext);
    const [contactData, setContactData] = useState<ContactSchema>();
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        if (!contactData) {
            setContactData(state.list.find(({ id }) => id === contactId));
        }
    }, [contactData, state.list, contactId]);

    if (isProcessing) {
        return (
            <Loader message="Please wait, receiving contact data..." />
        );
    } else {
        if (!contactData) {
            return <p>Invalid contact ID: contactId.</p>;
        } else {
            const handleSubmit = (e: FormEvent) => {
                e.preventDefault();

				const formEl = e.target as HTMLFormElement;
				const formData = new FormData(formEl);

                setContactData({
					id: contactId,
                    first_name: formData.get("first_name") as string,
                    last_name: formData.get("last_name") as string,
                    job: formData.get("job") as string,
                    description: formData.get("description") as string,
                });

                setShowConfirm(true);
            };
            const handleConfirm = () => {
                editContact(contactData);
                history.push("/");
            };

            return (
                <Fragment>
                    <ContactEditor
                        onSubmit={handleSubmit}
                        action="edit"
                        contactData={contactData}
                    />

                    {showConfirm
                        ? (
                            <ConfirmDialog
                                message={`Are you sure you want to apply changes to ${contactData
                                    ?.first_name} ${contactData?.last_name}?`}
                                onConfirm={handleConfirm}
                                onDeny={() => setShowConfirm(false)}
                            />
                        )
                        : null}
                </Fragment>
            );
        }
    }
};

export default EditContact;
