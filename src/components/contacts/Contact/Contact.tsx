import { ContactsContext } from "$helpers/ContactsContext";
import { Icon } from "@iconify/react";
import personBoundingBox from "@iconify-icons/bi/person-bounding-box";
import ConfirmDialog from "src/components/ConfirmDialog/ConfirmDialog";
import { Button, ButtonLink } from "$components";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./Contact.module.scss";

import type { ContactSchema } from "$types";
import type { FunctionComponent } from "react";

type ContactProps = ContactSchema;

const ContactItem: FunctionComponent<ContactProps> = (props) => {
    const { id, first_name, last_name, job, description } = props;

    const { isProcessing, removeContact } = useContext(ContactsContext);
    const [showDelConfirm, setShowDelConfirm] = useState(false);
    const history = useHistory();

    const isViewMode = window.location.pathname.includes("/view");

    function handleDeleteConfirm() {
        removeContact(id);

        if (isViewMode) {
            history.push("/");
        }

		setShowDelConfirm(false);
    }

    return (
        <div
            className={styles.contactBox}
            aria-expanded={isViewMode}
        >
            <Icon icon={personBoundingBox} className={styles.profile} />

            <div className={styles.details}>
                <p className={styles.name}>
                    <span className={styles.contactId}>{id}</span>
                    <span className={styles.firstName}>{first_name}</span>
                    <span className={styles.lastName}>{last_name}</span>
                </p>

                <p className={styles.job}>{job}</p>

                <p className={styles.description}>{description}</p>
            </div>

            <div className={styles.buttons}>
                {isViewMode
                    ? <ButtonLink
                        to="/"
                        label="Return"
                        title="Return to contact list"
                    />
                    : <ButtonLink
                        to={`/view/${id}`}
                        label="View"
                        title="View this contact"
                        color="receive"
                    />}

                <ButtonLink
                    to={`/edit/${id}`}
                    title="Edit this contact"
                    label="Edit"
                    color="update"
                />

                <Button
                    label="Delete"
                    title="Delete this contact"
                    onClick={() => setShowDelConfirm(true)}
                    color="destroy"
                    disabled={showDelConfirm && isProcessing}
                />
            </div>

            <ConfirmDialog
                show={showDelConfirm}
                message={`Are you sure you want to delete ${first_name} ${last_name} contact?`}
                onConfirm={handleDeleteConfirm}
                onDeny={() => setShowDelConfirm(false)}
            />
        </div>
    );
};

export default ContactItem;
