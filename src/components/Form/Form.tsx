import React from "react";
import styles from "./Form.module.scss";

import type {
    ChangeEvent,
    ContactSchema,
    FormEvent,
    FunctionComponent,
} from "$types";

// FIXME:
// This is too verbose.
// I can't figure out how to share props with useState or useContext
interface FormProps {
	onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    firstNameValue: ContactSchema["first_name"];
	onFirstNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
    lastNameValue: ContactSchema["last_name"];
	onLastNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
    jobValue: ContactSchema["job"];
	onJobChange: (e: ChangeEvent<HTMLInputElement>) => void;
    descriptionValue: ContactSchema["description"];
	onDescriptionChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const Form: FunctionComponent<FormProps> = (props) => {
    const {
        onSubmit,
        firstNameValue,
        onFirstNameChange,
        lastNameValue,
        onLastNameChange,
        jobValue,
        onJobChange,
        descriptionValue,
        onDescriptionChange,
    } = props;

    return (
        <form
            id="contact-editor"
            className={styles.contactEditor}
            onSubmit={onSubmit}
        >
            <div className={styles.field}>
                <label htmlFor="first_name">First name</label>
                <input
                    type="text"
                    name="first_name"
                    value={firstNameValue}
                    onChange={onFirstNameChange}
                    required
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="last_name">Last name</label>
                <input
                    type="text"
                    name="last_name"
                    value={lastNameValue}
                    onChange={onLastNameChange}
                    required
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="job">Job</label>
                <input
                    type="text"
                    name="first_name"
                    value={jobValue}
                    onChange={onJobChange}
                    required
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="description">Description</label>
                <textarea
                    name="description"
                    value={descriptionValue}
                    onChange={onDescriptionChange}
                    required
                />
            </div>

            <input type="submit" value="Submit" />
        </form>
    );
};

export default Form;
