import iconSortAscending from "@iconify-icons/bi/sort-alpha-down";
import iconSortDescending from "@iconify-icons/bi/sort-alpha-up";
import { ButtonIcon, Contact } from "$components";
import { ContactsContext } from "$helpers/ContactsContext";
import React, { Fragment, useContext, useEffect, useState } from "react";
import styles from "./ContactsList.module.scss";
import randomData from "./randomData.json";

import type { FunctionComponent } from "react";
import { Button } from "src/components/buttons";
import { ContactSchema } from "$types";

const ContactsList: FunctionComponent = () => {
    const { state, sortList, addContact } = useContext(ContactsContext);
    const [renderedList, setRenderedList] = useState(state.list);
	const [pressed, setPressed] = useState(false);

	const icon = state.sortOrder === "ascending" ? iconSortAscending : iconSortDescending;

    useEffect(() => {
        setRenderedList([...state.list]);
    }, [state]);

	function handleSortClick() {
		if (!pressed) {
			setPressed(true);
		}

		sortList(state.sortOrder === "ascending" ? "descending" : "ascending");
	}

	function handleGenerateClick() {
		const contacts = randomData.contacts as ContactSchema[];

		contacts.forEach((item) => {
			addContact(item);
		});
	}

    if (renderedList.length > 0) {
        return (
            <Fragment>
                <ButtonIcon
					aria-pressed={pressed}
                    icon={icon}
                    onClick={handleSortClick}
                    title={`Sort by first name in ${state.sortOrder} order`}
                />

                <ul className={styles.contactsList}>
                    {renderedList.map((contact, index) => {
                        return (
                            <li key={index}>
                                <Contact {...contact} />
                            </li>
                        );
                    })}
                </ul>
            </Fragment>
        );
    } else {
        return (
			<Fragment>
				<p>The list is empty. Consider adding a <a href="#btn-add-contact">new contact</a> or <a href="#btn-generate-contacts">generate a random data</a>.</p>

				<Button
					id="btn-generate-contacts"
					label="Generate random data"
					onClick={handleGenerateClick}
					title="Generate a random list of contacts data"
				/>
			</Fragment>
		);
    }
};

export default ContactsList;
