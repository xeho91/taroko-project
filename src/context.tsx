import contactsReducer, { ContactActionType } from "$reducer";
import React, { createContext, useReducer } from "react";

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

    // FIXME: It doesn't add to the list in ContactsContext
    function addContact(data: ContactActionAdd["payload"]) {
        dispatch({
            type: ContactActionType.Create,
            payload: data,
        });
    }

    // NOTE: This one is not used, so far.
    function getContact(id: ContactActionGet["payload"]) {
        dispatch({
            type: ContactActionType.Retrieve,
            payload: id,
        });
    }

    // FIXME: It doesn't update the ContactsContext
    function editContact(contact: ContactActionEdit["payload"]) {
        dispatch({
            type: ContactActionType.Update,
            payload: contact,
        });
    }

    // NOTE: This one works.
    function removeContact(id: ContactActionRemove["payload"]) {
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
