import contactsReducer, {
    ContactActionAdd,
    ContactActionEdit,
    ContactActionGet,
    ContactActionRemove,
    ContactActionType,
} from "$reducer";
import React, { createContext, useReducer } from "react";

import type { ContactsState, Dispatch, FunctionComponent } from "$types";

interface ContactsContextProps {
    state: ContactsState;
    addContact: Dispatch<ContactActionAdd>;
    getContact: Dispatch<ContactActionGet>;
    editContact: Dispatch<ContactActionEdit>;
    removeContact: Dispatch<ContactActionRemove>;
}

const initialState: ContactsState = {
    list: [
        {
            id: 1,
            first_name: "Anakin",
            last_name: "Skywalker",
            job: "Jedi Knight",
            description: "Chosen one.",
        },
        {
            id: 2,
            first_name: "Luke",
            last_name: "Skywalker",
            job: "Jedi Master",
            description: "Not the chosen one.",
        },
    ],
};

export const ContactsContext = createContext<ContactsContextProps>({
    state: initialState,
    addContact: () => undefined,
    getContact: () => undefined,
    editContact: () => undefined,
    removeContact: () => undefined,
});

export const ContactsProvider: FunctionComponent = ({ children }) => {
    const [state, dispatch] = useReducer(contactsReducer, initialState);

    function addContact(data: ContactActionAdd["payload"]) {
        dispatch({
            type: ContactActionType.Create,
            payload: data,
        });
    }

    function getContact(id: ContactActionGet["payload"]) {
		console.log("Hello from getContact, the id is:", id);
        dispatch({
            type: ContactActionType.Retrieve,
            payload: id,
        });
    }

    function editContact(contact: ContactActionEdit["payload"]) {
        dispatch({
            type: ContactActionType.Update,
            payload: contact,
        });
    }

    function removeContact(id: ContactActionRemove["payload"]) {
		console.log("Hello");
		console.log("The id is:", id);
        dispatch({
            type: ContactActionType.Delete,
            payload: id,
        });
    }

    // FIXME: I can't figure out how to solve these typing errors.
    return (
        <ContactsContext.Provider
            value={{
                state,
                addContact,
                getContact,
                editContact,
                removeContact,
            }}
        >
            {children}
        </ContactsContext.Provider>
    );
};
