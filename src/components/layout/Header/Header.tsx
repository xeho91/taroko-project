import { ButtonLink, Nav } from "$components";
import React from "react";
import styles from "./Header.module.scss";

import type { FunctionComponent } from "$types";

const Header: FunctionComponent = () => {
    return (
        <header className={styles.pageHeader}>
            <Nav />

            <ButtonLink
				to="/add"
				label="Add contact"
				color="create"
			/>
        </header>
    );
};

export default Header;
