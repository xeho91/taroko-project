import { ContactsContext } from "$helpers/ContactsContext";
import iconSortAscending from "@iconify-icons/bi/sort-alpha-down";
import iconSortDescending from "@iconify-icons/bi/sort-alpha-up";
import { ButtonIcon, Contact, Loader } from "$components";
import React, { Fragment, useContext, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./ContactsList.module.scss";
import { contacts } from "./exampleContacts.json";

import { Button } from "src/components/buttons";
import type { FunctionComponent } from "react";

const ContactsList: FunctionComponent = () => {
    const { state, isProcessing, sortList, addContact } = useContext(
        ContactsContext,
    );
    const [sortPressed, setSortPressed] = useState(false);
    const contactRef = useRef(null);

    const icon = state.sortOrder === "descending"
        ? iconSortDescending
        : iconSortAscending;

    function handleSortListClick() {
        if (!sortPressed) {
            setSortPressed(true);
        }

        sortList(state.sortOrder === "ascending" ? "descending" : "ascending");
    }

    function handleAddExamplesClick() {
        contacts.forEach((item) => {
            addContact(item);
        });
    }

    if (isProcessing && state.list.length === 0) {
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
                        title={`Sort by first name in ${
                            state.sortOrder === "ascending"
                                ? "descending"
                                : "ascending"
                        } order`}
                    />

                    <ul className={styles.contactsList}>
                        {state.list.map((contact, index) => {
                            return (
                                <CSSTransition
                                    key={index}
                                    timeout={1000}
                                    nodeRef={contactRef}
                                    in
                                    appear
                                    classNames={{
                                        appear: styles["contact-appear"],
                                        appearActive: styles["contact-appear-active"],
                                        enter: styles["contact-enter"],
                                        enterActive: styles["contact-enter-active"],
                                        exit: styles["contact-exit"],
                                        exitActive: styles["contact-exit-active"],
                                    }}
                                >
                                    <li ref={contactRef} className={styles.contact}>
                                        <Contact {...contact} />
                                    </li>
                                </CSSTransition>
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
                        onClick={handleAddExamplesClick}
                        title="Click to use an example list of contacts data"
                    />
                </Fragment>
            );
        }
    }
};

export default ContactsList;
