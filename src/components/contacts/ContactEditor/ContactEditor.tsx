import { ContactsContext } from "$helpers/ContactsContext";
import { Button } from "src/components/buttons";
import { ConfirmDialog } from "$components";
import React, { Fragment, useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./ContactEditor.module.scss";

import type { ContactSchema } from "$types";
import type { ChangeEvent, FormEvent, FunctionComponent } from "react";

interface EditorBaseProps {
	action: string;
	data?: ContactSchema;
}
interface EditorAddProps {
    action: "add";
}
interface EditorEditProps {
    action: "edit";
    data: ContactSchema;
}
type ContactEditorProps = EditorBaseProps & (EditorAddProps | EditorEditProps);

type InputName = keyof Omit<ContactSchema, "id">;

const ContactEditor: FunctionComponent<ContactEditorProps> = (props) => {
    const { action, data } = props;

    const form = useRef(null);

    const { addContact, editContact } = useContext(ContactsContext);

    const [firstName, setFirstName] = useState(data?.first_name || "");
    const [lastName, setLastName] = useState(data?.last_name || "");
    const [job, setJob] = useState(data?.job || "");
    const [description, setDescription] = useState(data?.description || "");

    const [showConfirm, setShowConfirm] = useState(false);

    const history = useHistory();

	let confirmMessage = "";

    if (action === "add") {
        confirmMessage =
            `Are you sure you want to add ${firstName} ${lastName} to the list?`;
    } else if (action === "edit") {
        confirmMessage =
            `Are you sure you want to apply changes to ${firstName} ${lastName}?`;
    }

    function handleChange(
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) {
        const name = e.target.name as InputName;
        const value = e.target.value;

        switch (name) {
            case "first_name": {
                setFirstName(value);
                break;
            }

            case "last_name": {
                setLastName(value);
                break;
            }

            case "job": {
                setJob(value);
                break;
            }

            case "description": {
                setDescription(value);
                break;
            }
        }
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setShowConfirm(true);
    }

    function handleConfirm() {
        const newData = {
            first_name: firstName,
            last_name: lastName,
            job: job,
            description: description,
        };

        if (action === "add") {
            addContact(newData);
        } else if (action === "edit") {
			editContact({ id: data!.id, ...newData });
        }

        history.push("/");
    }

    return (
        <Fragment>
            <h1>Contact Editor</h1>

            <form
                ref={form}
                id="contact-editor"
                className={styles.contactEditor}
                onSubmit={handleSubmit}
            >
                <div className={styles.field}>
                    <label htmlFor="first_name">First name</label>
                    <input
                        type="text"
                        name="first_name"
                        value={firstName}
                        onChange={handleChange}
                        placeholder="Provide first name here..."
                        minLength={2}
                        maxLength={10}
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label htmlFor="last_name">Last name</label>
                    <input
                        type="text"
                        name="last_name"
                        value={lastName}
                        onChange={handleChange}
                        minLength={3}
                        maxLength={15}
                        placeholder="Provide last name here..."
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label htmlFor="job">Job</label>
                    <input
                        type="text"
                        name="job"
                        value={job}
                        onChange={handleChange}
                        minLength={8}
                        maxLength={20}
                        placeholder="What's the job title?"
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        value={description}
                        onChange={handleChange}
                        minLength={10}
                        placeholder="Provide a description here..."
                        required
                    />
                </div>

                {action === "add" && (
                    <Button type="submit" value="Add contact" />
                )}

                {action === "edit" && (
                    <Button type="submit" value="Edit contact" />
                )}

                <ConfirmDialog
                    show={showConfirm}
                    message={confirmMessage}
                    onConfirm={handleConfirm}
                    onDeny={() => setShowConfirm(false)}
                />
            </form>
        </Fragment>
    );
};

export default ContactEditor;
