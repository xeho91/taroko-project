import iconSortAscending from "@iconify-icons/bi/sort-alpha-down";
import iconSortDescending from "@iconify-icons/bi/sort-alpha-up";
import { ButtonIcon, Contact } from "$components";
import { ContactsContext } from "$helpers/ContactsContext";
import React, { Fragment, useContext, useEffect, useState } from "react";
import styles from "./ContactsList.module.scss";

import type { FunctionComponent } from "react";

const ContactsList: FunctionComponent = () => {
    const { state, sortList } = useContext(ContactsContext);
    const [renderedList, setRenderedList] = useState(state.list);
	const [pressed, setPressed] = useState(false);

	const icon = state.sortOrder === "ascending" ? iconSortAscending : iconSortDescending;

    useEffect(() => {
        setRenderedList([...state.list]);
    }, [state]);

	function handleClick() {
		if (!pressed) {
			setPressed(true);
		}

		sortList(state.sortOrder === "ascending" ? "descending" : "ascending");
	}

    if (renderedList.length > 0) {
        return (
            <Fragment>
                <ButtonIcon
					aria-pressed={pressed}
                    icon={icon}
                    onClick={handleClick}
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
        return <p>No data.</p>;
    }
};

export default ContactsList;
