import { Contact } from "$components";
import React, { useContext } from "react";
import styles from "./ContactsList.module.scss";

import { ContactsContext } from "$context";
import type { FunctionComponent } from "$types";

const ContactsList: FunctionComponent = () => {
	const { state: { list } } = useContext(ContactsContext);

	if (list.length > 0) {
		return (
			<div className={styles.contactsList}>
				{list.map((contact, index) => {
					return <Contact key={index} {...contact} />;
				})}
			</div>
		);
	} else {
		return <p>No data.</p>;
	}
};

export default ContactsList;
