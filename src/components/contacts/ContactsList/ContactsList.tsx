import { ContactsContext } from "$helpers/ContactsContext";
import iconSortAscending from "@iconify-icons/bi/sort-alpha-down";
import iconSortDescending from "@iconify-icons/bi/sort-alpha-up";
import { ButtonIcon, Contact, Loader } from "$components";
import React, { Fragment, useContext, useState } from "react";
import styles from "./ContactsList.module.scss";
import { contacts } from "./exampleContacts.json";

import { Button } from "src/components/buttons";
import type { FunctionComponent } from "react";

const ContactsList: FunctionComponent = () => {
    const { state, isProcessing, sortList, addContact } = useContext(
        ContactsContext,
    );
    const [sortPressed, setSortPressed] = useState(false);

    const icon = state.sortOrder === "ascending"
        ? iconSortAscending
        : iconSortDescending;

    function handleSortListClick() {
        if (!sortPressed) {
            setSortPressed(true);
        }

        sortList(state.sortOrder === "ascending" ? "descending" : "ascending");
    }

    function useExampleContactsClick() {
        contacts.forEach((item) => {
            addContact(item);
        });
    }

    if (isProcessing) {
        return (
            <Loader message="Please wait, fetching data from the API..." />
        );
    } else {
        if (state.list.length > 0) {
            return (
                <Fragment>
                    <ButtonIcon
                        id="btn-sort-list"
                        aria-pressed={sortPressed}
                        icon={icon}
                        onClick={handleSortListClick}
                        title={`Sort by first name in ${state.sortOrder} order`}
                    />

                    <ul className={styles.contactsList}>
                        {state.list.map((contact, index) => {
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
                    <p>
                        The list is empty. Consider adding a
                        <a href="#btn-add-contact">new contact</a>
                        or
                        <a href="#btn-use-example-contacts">
                            use an example contacts list
                        </a>.
                    </p>

                    <Button
                        id="btn-use-example-contacts"
                        label="Use an example contacts data"
                        onClick={useExampleContactsClick}
                        title="Click to use an example list of contacts data"
                    />
                </Fragment>
            );
        }
    }
};

export default ContactsList;
