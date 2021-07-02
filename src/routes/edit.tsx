import styles from "$styles/forms.module.scss";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

import type { Contact, FunctionComponent } from "$types";

export const EditContact: FunctionComponent = (route) => {
	const history = useHistory();
	const currentContactId = route.match.params.id as Contact["id"];
	const { list, editContact } = useContext(GlobalContext);
	const [selectedContact, setSelectedContact] = useState({
		id: null,
		first_name: "",
		last_name: "",
		job: "",
		description: "",
	});

	useEffect(() => {
		const contactId = currentContactId;
		const selectedContact = list.find(({ id }) => id === contactId);

		if (selectedContact) {
			setSelectedContact(selectedContact);
		}
	}, [currentContactId, list]);

	function handleSubmit(e: InputEvent) {
		e.preventDefault();
		editContact(selectedContact);
		history.push("/");
	}

	const handleOnChange = (userKey: keyof Contact, newValue: string) => {
		return setSelectedContact({ ...selectedContact, [userKey]: newValue });
	};

	if (!selectedContact || !selectedContact.id) {
		return <p>Invalid contact ID.</p>;
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
						value={selectedContact.first_name}
						onChange={(e) =>
							handleOnChange("first_name", e.target.value)
						}
						required
					/>
				</div>

				<div className={styles.field}>
					<label htmlFor="last_name">Last name</label>
					<input
						type="text"
						name="last_name"
						value={selectedContact.last_name}
						onChange={(e) => handleOnChange("last_name", e.target.value)}
						required
					/>
				</div>

				<div className={styles.field}>
					<label htmlFor="job">Job</label>
					<input
						type="text"
						name="first_name"
						value={selectedContact.job}
						onChange={(e) => handleOnChange("job", e.target.value)}
						required
					/>
				</div>

				<div className={styles.field}>
					<label htmlFor="description">Description</label>
					<textarea
						name="description"
						value={selectedContact.description}
						onChange={(e) =>
							handleOnChange("description", e.target.value)
						}
						required
					/>
				</div>

				<input type="submit" value="Submit" />
			</form>
		</Fragment>
	);
};
