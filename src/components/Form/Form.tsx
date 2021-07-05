import React, { Fragment } from "react";
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
        <Fragment>
            <h1>Contact Editor</h1>
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
                        value={lastNameValue}
                        onChange={onLastNameChange}
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
                        name="first_name"
                        value={jobValue}
                        onChange={onJobChange}
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
                        value={descriptionValue}
                        onChange={onDescriptionChange}
						minLength={40}
						placeholder="Provide a description here..."
                        required
                    />
                </div>

                <input type="submit" value="Submit" />
            </form>
        </Fragment>
    );
};

export default Form;
