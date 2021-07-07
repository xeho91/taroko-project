import { Icon } from "@iconify/react";
import personBoundingBox from "@iconify-icons/bi/person-bounding-box";
import { Button, ButtonLink } from "$components";
import { ContactsContext } from "$helpers/ContactsContext";
import React, { useContext, useState } from "react";
import styles from "./Contact.module.scss";
import { useHistory } from "react-router-dom";

import type { ContactSchema } from "$types";
import type { FunctionComponent } from "react";

type ContactProps = ContactSchema;

const ContactItem: FunctionComponent<ContactProps> = (props) => {
	const history = useHistory();
    const { id, first_name, last_name, job, description } = props;
	const isViewMode = window.location.pathname.includes("/view");
	const [isPressed, setIsPressed] = useState(false);

    const { removeContact } = useContext(ContactsContext);

    function deleteContact() {
        removeContact(id);
		setIsPressed(true);

		if (isViewMode) {
			history.push("/");
		} else {
			if (document.activeElement instanceof HTMLButtonElement) {
				document.activeElement.blur();
			}
		}
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
					/>
				}

                <ButtonLink
                    to={`/edit/${id}`}
                    title="Edit this contact"
                    label="Edit"
					color="update"
                />

                <Button
                    label="Delete"
                    title="Delete this contact"
                    onClick={deleteContact}
					color="destroy"
					disabled={isPressed}
                />
            </div>
        </div>
    );
};

export default ContactItem;
