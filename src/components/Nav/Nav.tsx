import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Nav.module.scss";

import type { FunctionComponent } from "$types";

const Nav: FunctionComponent = () => {
	return (
		<nav className={styles.nav}>
			<ul>
				<li>
					<NavLink to="/" title={`Go to home page`}>
						Contact List
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
