import personBoundingBox from "@iconify-icons/bi/person-bounding-box";
import { Button } from "$components";
import { Icon } from "@iconify/react";
import { ContactsContext } from "$context";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Contact.module.scss";

import type { ContactSchema, FunctionComponent } from "$types";

type ContactProps = ContactSchema;

const ContactItem: FunctionComponent<ContactProps> = (props) => {
    const { id, first_name, last_name, job, description } = props;
    const { removeContact } = useContext(ContactsContext);

    function deleteContact() {
        removeContact(id);
    }

    return (
        <div className={styles.contactBox}>
            <Link
                to={`/view/${id}`}
                title="Open this contact"
            >
                <Icon
                    icon={personBoundingBox}
                    className={styles.profile}
                    width="90%"
                    height="90%"
                />
            </Link>

            <div className={styles.details}>
                <p className={styles.name}>
                    <span className={styles.firstName}>{first_name}</span>
                    &nbsp;
                    <span className={styles.lastName}>{last_name}</span>
                </p>
                <p className={styles.job}>{job}</p>
                <p className={styles.description}>Description: {description}</p>
            </div>

            <div className={styles.buttons}>
                <Link
                    to={`/edit/${id}`}
                    className={styles.editButton}
                    title="Edit this contact"
                >
                    Edit
                </Link>
                <Button
                    label="Delete"
                    title="Delete this contact"
                    className={styles.deleteButton}
                    onClick={deleteContact}
                />
            </div>
        </div>
    );
};

export default ContactItem;
