import { Contact } from "$components";
import { ContactsContext } from "$context";
import React, { useContext, useEffect, useState } from "react";
import styles from "./ContactsList.module.scss";

import type { FunctionComponent } from "$types";

const ContactsList: FunctionComponent = () => {
    const { state } = useContext(ContactsContext);
    const [renderedList, setRenderedList] = useState(state.list);

    useEffect(() => {
        setRenderedList([...state.list]);
    }, [state]);

    if (renderedList.length > 0) {
        return (
            <ul className={styles.contactsList}>
                {renderedList.map((contact, index) => {
                    return (
                        <li key={index}>
                            <Contact {...contact} />
                        </li>
                    );
                })}
            </ul>
        );
    } else {
        return <p>No data.</p>;
    }
};

export default ContactsList;
