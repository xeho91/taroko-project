import { ButtonLink, Nav } from "$components";
import React from "react";
import styles from "./Header.module.scss";

import type { FunctionComponent } from "react";

const Header: FunctionComponent = () => {
    return (
        <header className={styles.pageHeader}>
            <Nav />

            <ButtonLink
				id="btn-add-contact"
				to="/add"
				label="Add contact"
				color="create"
			/>
        </header>
    );
};

export default Header;
