import contactsReducer, { ContactActionType, ListActionType } from "$reducer";
import React, { createContext, useEffect, useReducer, useState } from "react";

import type {
    ContactActionAdd,
    ContactActionEdit,
    ContactActionGet,
    ContactActionRemove,
    ContactsState,
    Dispatch,
    FunctionComponent,
} from "$types";

interface ContactsContextProps {
    state: ContactsState;
    addContact: Dispatch<ContactActionAdd["payload"]>;
    getContact: Dispatch<ContactActionGet["payload"]>;
    editContact: Dispatch<ContactActionEdit["payload"]>;
    removeContact: Dispatch<ContactActionRemove["payload"]>;
    sortList: () => void;
}

const urlAPI = "https://taroko-contacts-server.herokuapp.com/api/contacts";

const initialState: ContactsState = {
    list: [
        // {
        //     id: 1,
        //     first_name: "Anakin",
        //     last_name: "Skywalker",
        //     job: "Jedi Knight",
        //     description: `Anakin Skywalker was a legendary human male Jedi Knight of the Galactic Republic and the prophesied Chosen One of the Jedi Order, destined to bring balance to the Force. Also known as "Ani" during his childhood, Skywalker earned the moniker "Hero With No Fear" from his accomplishments in the Clone Wars. His alter ego, Darth Vader, the Dark Lord of the Sith, was created when Skywalker turned to the dark side of the Force, pledging his allegiance to the Sith Lord Darth Sidious at the end of the Republic Era.`,
        // },
        // {
        //     id: 2,
        //     first_name: "Luke",
        //     last_name: "Skywalker",
        //     job: "Jedi Master",
        //     description: `Luke Skywalker, a Force-sensitive human male, was a legendary Jedi Master who fought in the Galactic Civil War during the reign of the Galactic Empire. Along with his companions, Princess Leia Organa and General Han Solo, Skywalker served on the side of the Alliance to Restore the Republic—an organization committed to the downfall of the Galactic Empire and the restoration of democracy. Following the war, Skywalker became a living legend, and was remembered as one of the greatest Jedi in galactic history.`,
        // },
        // {
        //     id: 3,
        //     first_name: "Han",
        //     last_name: "Solo",
        //     job: "Smuggler",
        //     description: `Han Solo, known only as Han until being given the surname Solo by an Imperial recruitment officer, and formerly known as Cadet 124-329 while serving as an Imperial cadet, was a human male smuggler. He became a leader in the Alliance to Restore the Republic and an instrumental figure in the defeat of the Galactic Empire during the Galactic Civil War. He hailed from Corellia and became a smuggler, even completing the Kessel Run in just twelve parsecs with his prized ship, the Millennium Falcon, and coming under the employ of Jabba the Hutt. He was the son-in-law of fallen Jedi Knight Anakin Skywalker and Senator Padmé Amidala, husband of Princess Leia Organa, brother-in-law of Jedi Master Luke Skywalker, father of Ben Solo, rivals and close friends with fellow smuggler Lando Calrissian, and best friends with the Wookiee Chewbacca, his trusted copilot who swore a life debt to the Corellian smuggler. Solo ran afoul of Jabba after ditching a shipment of spice to avoid trouble with the Empire, owing the Hutt a great deal of money as a result. His fortune seemed to have changed when he agreed to charter Luke Skywalker, Obi-Wan Kenobi, and the droids R2-D2 and C-3PO to Alderaan, but he became caught up in the rebellion against the Empire and, after helping Princess Leia Organa escape from the Death Star, briefly fought in the Battle of Yavin, which allowed Skywalker to destroy the superweapon. Solo fought with the Rebellion for a number of years afterward, taking part in numerous operations and battles against the Empire.`,
        // },
        // {
        //     id: 4,
        //     first_name: "Ben",
        //     last_name: "Solo",
        //     job: "Sith / Jedi",
        //     description: `Ben Solo was a human male Jedi who returned to the light side of the Force by renouncing the dark side. His alter ego, Kylo Ren, was the master of the Knights of Ren and Supreme Leader of the First Order. A product of Jedi and Sith teachings, Ren embodied the conflict between the dark side and the light, making the young Force warrior dangerously unstable. Yet it was through discord that he derived power, and he learned to channel his anger into strength. Inspired by the legacy of his grandfather, the Sith Lord Darth Vader, Ren sought to destroy the last remnants of the Jedi Order and conquer the galaxy.`,
        // },
    ],
    deletedIds: [],
};

export const ContactsContext = createContext<ContactsContextProps>({
    state: initialState,
    addContact: () => undefined,
    getContact: () => undefined,
    editContact: () => undefined,
    removeContact: () => undefined,
    sortList: () => undefined,
});

export const ContactsProvider: FunctionComponent = ({ children }) => {
    const [state, dispatch] = useReducer(contactsReducer, initialState);
    const [dataFetched, setDataFetched] = useState(false);

    useEffect(() => {
		void getList().then(() => {
			setDataFetched(true);
		});
    }, [dataFetched]);

    async function addContact(data: ContactActionAdd["payload"]) {
        const request = await fetch(urlAPI, {
            method: "post",
            body: JSON.stringify({ data }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const response = await request.json();
        const status = await response.statusCode as number;

        if (status === 201) {
            // TODO: Add success feedback.

            dispatch({
                type: ContactActionType.Create,
                payload: data,
            });
        } else {
            // TODO: Add error feedback.
        }
    }

    // NOTE: This one is not used, so far.
    function getContact(id: ContactActionGet["payload"]) {
        dispatch({
            type: ContactActionType.Retrieve,
            payload: id,
        });
    }

    async function editContact(contact: ContactActionEdit["payload"]) {
        const request = await fetch(urlAPI, {
            method: "PATCH",
            // FIXME:
            // It's supposed to update only specific property.
            // I got lost in the logic.
            body: JSON.stringify({ contact }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const response = await request.json();
        const { statusCode } = await response;

        if (statusCode === 201) {
            // TODO: Add success feedback.

            dispatch({
                type: ContactActionType.Update,
                payload: contact,
            });
        } else {
            // TODO: Add error feedback.
        }
    }

    async function removeContact(id: ContactActionRemove["payload"]) {
        const request = await fetch(`${urlAPI}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const response = await request.json();
        const { statusCode } = await response;

        if (statusCode === 200) {
            // TODO: Add success feedback.

            dispatch({
                type: ContactActionType.Delete,
                payload: id,
            });
        } else {
            // TODO: Add error feedback.
        }
    }

    async function getList() {
        const request = await fetch(urlAPI, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const response = await request.json();
        const { data, statusCode } = await response;

		if (statusCode === 200) {
			dispatch({
				type: ListActionType.Retrieve,
				payload: data,
			})
		}
    }

    function sortList() {
        dispatch({
            type: ListActionType.Sort,
        });
    }

    return (
        <ContactsContext.Provider
            value={{
                state,
                addContact,
                getContact,
                editContact,
                removeContact,
                sortList,
            }}
        >
            {children}
        </ContactsContext.Provider>
    );
};
