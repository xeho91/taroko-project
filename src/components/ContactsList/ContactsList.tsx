import { Button, Contact } from "$components";
import React, { Fragment, useContext, useState } from "react";
import styles from "./ContactsList.module.scss";

import { ContactsContext } from "$context";
import type { FunctionComponent } from "$types";

const ContactsList: FunctionComponent = () => {
    const { state: { list } } = useContext(ContactsContext);
	const [renderedList, setRenderedList] = useState(list);

    function handleClick() {
        setRenderedList([...renderedList.sort((a, b) => {
			return a.first_name.localeCompare(b.first_name);
        })]);
    }

    if (renderedList.length > 0) {
        return (
            <Fragment>
                <Button label="Sort by first name" onClick={handleClick} />

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
