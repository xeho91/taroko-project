import Nav from "$components/Nav/Nav";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

import type { FunctionComponent } from "$types";

const Header: FunctionComponent = () => {
	return (
		<header className={styles.pageHeader}>
			<Nav />
			<Link to="/add" className={styles.addButton}>
				Add Contact
			</Link>
		</header>
	);
};

export default Header;
