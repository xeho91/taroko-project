import iconSortAscending from "@iconify-icons/bi/sort-alpha-down";
import { ButtonIcon, ContactsList } from "$components";
import React, { Fragment, useContext } from "react";
import { ContactsContext } from "$context";
import "$styles/home.scss";

import { FunctionComponent } from "$types";

const Home: FunctionComponent = () => {
	const { sortList } = useContext(ContactsContext);

    function handleClick() {
		sortList();
    }

    return (
        <Fragment>
            <h1>Contacts</h1>

            <ButtonIcon
				id="btn-sort"
				icon={iconSortAscending}
                onClick={handleClick}
                title="Sort by first name"
            />

            <ContactsList />
        </Fragment>
    );
};

export default Home;
