import React, { Fragment, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

import styles from "$styles/forms.module.scss";

import type { FunctionComponent } from "$types";

export const AddContact: FunctionComponent = () => {
	const history = useHistory();

	const { addContact, list } = useContext(GlobalContext);

	const [first_name, setFirstName] = useState("");
	const [last_name, setLastName] = useState("");
	const [job, setJob] = useState("");
	const [description, setDescription] = useState("");

	function handleSubmit(e: Event) {
		e.preventDefault();

		const newContact = {
			id: list.length + 1,
			first_name,
			last_name,
			job,
			description,
		};

		addContact(newContact);
		history.push("/");
	}

	return (
		<Fragment>
			<form
				id="contact-editor"
				className={styles.contactEditor}
				onSubmit={handleSubmit}
			>
				<div className={styles.field}>
					<label htmlFor="first_name">First name</label>
					<input
						type="text"
						name="first_name"
						value={first_name}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</div>

				<div className={styles.field}>
					<label htmlFor="last_name">Last name</label>
					<input
						type="text"
						name="last_name"
						value={last_name}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</div>

				<div className={styles.field}>
					<label htmlFor="job">Job</label>
					<input
						type="text"
						name="first_name"
						value={job}
						onChange={(e) => setJob(e.target.value)}
						required
					/>
				</div>

				<div className={styles.field}>
					<label htmlFor="description">Description</label>
					<textarea
						name="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
					/>
				</div>

				<input type="submit" value="Submit" />
			</form>
		</Fragment>
	);
};
