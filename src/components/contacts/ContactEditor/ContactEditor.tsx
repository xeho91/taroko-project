import React, { Fragment, useState, useRef } from "react";
import styles from "./ContactEditor.module.scss";

import { Button } from "src/components/buttons";
import type { ContactSchema } from "$types";
import type { ChangeEvent, FormEvent, FunctionComponent } from "react";

// FIXME:
// This is too verbose.
// I can't figure out how to share props with useState or useContext
interface ContactEditorProps {
    action: "add" | "edit";
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
	contactData? : ContactSchema;
}

const ContactEditor: FunctionComponent<ContactEditorProps> = (props) => {
    const { action, onSubmit, contactData } = props;

	const form = useRef(null);

    const [first_name, setFirstName] = useState(contactData?.first_name);
    const [last_name, setLastName] = useState(contactData?.last_name);
    const [job, setJob] = useState(contactData?.job);
    const [description, setDescription] = useState(contactData?.description);

    type ContactDataName = keyof Omit<ContactSchema, "id">;

    const handleOnChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const name = e.target.name as ContactDataName;
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
    };

    return (
        <Fragment>
            <h1>Contact Editor</h1>

            <form
				ref={form}
                id="contact-editor"
                className={styles.contactEditor}
                onSubmit={onSubmit}
            >
                <div className={styles.field}>
                    <label htmlFor="first_name">First name</label>
                    <input
                        type="text"
                        name="first_name"
                        value={first_name}
                        onChange={handleOnChange}
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
                        value={last_name}
                        onChange={handleOnChange}
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
                        onChange={handleOnChange}
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
                        onChange={handleOnChange}
                        minLength={10}
                        placeholder="Provide a description here..."
                        required
                    />
                </div>

                {action === "add"
                    ? (
                        <Button type="submit" value="Add contact" />
                    )
                    : (
                        <Button type="submit" value="Edit contact" />
                    )}
            </form>
        </Fragment>
    );
};

export default ContactEditor;
