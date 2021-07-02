import Contact from "$components/Contact/Contact";
import React, { useContext } from "react";
import styles from "./ContactsList.module.scss";

import { GlobalContext } from "src/context/GlobalState";
import type { FunctionComponent } from "$types";

const ContactsList: FunctionComponent = () => {
	const { list } = useContext(GlobalContext);

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
