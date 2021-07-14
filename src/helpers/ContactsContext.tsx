import contactsReducer, {
    ContactActions,
    ContactsListActions,
} from "$helpers/contactsReducer";
import { StatusCodes } from "http-status-codes";
import React, { createContext, useReducer } from "react";
import {
    addContactData,
    deleteContactData,
    getContactData,
    getListData,
    updateContactData,
} from "./contactsAPIrequests";

import type { ContactsListActionSort } from "$helpers/contactsReducer";
import type {
    ContactActionAdd,
    ContactActionEdit,
    ContactActionRemove,
} from "$helpers/contactsReducer";
import type { ContactSchema } from "$types";
import type { Dispatch, FunctionComponent } from "react";

type SortOrder = "unsorted" | "ascending" | "descending";

export interface ContactsState {
    list: ContactSchema[];
    deletedIds: number[];
    sortOrder: SortOrder;
}

interface ContactsContextProps {
    state: ContactsState;

    getList: () => Promise<ContactsState["list"] | undefined>;
    sortList: Dispatch<ContactsListActionSort["payload"]>;

    addContact: Dispatch<ContactActionAdd["payload"]>;
    editContact: Dispatch<ContactActionEdit["payload"]>;
    getContact: (id: ContactSchema["id"]) => Promise<ContactSchema | undefined>;
    removeContact: Dispatch<ContactActionRemove["payload"]>;
}

const initialState: ContactsState = {
    list: [],
    deletedIds: [],
    sortOrder: "unsorted",
};

export const ContactsContext = createContext<ContactsContextProps>({
    state: initialState,

    getList: () => Promise.resolve(undefined),
    sortList: () => undefined,

    addContact: () => undefined,
    editContact: () => undefined,
    getContact: () => Promise.resolve(undefined),
    removeContact: () => undefined,
});

export const ContactsProvider: FunctionComponent = ({ children }) => {
    const [state, dispatch] = useReducer(contactsReducer, initialState);

    async function getList() {
        if (state.list.length > 0) {
            return state.list;
        } else {
            const { data, statusCode, message } = await getListData();

            if (statusCode === StatusCodes.OK) {
                // TODO: Add success feedback.
                console.log(message);

                dispatch({
                    type: ContactsListActions.Set,
                    payload: data,
                });

                return data;
            } else {
                // TODO: Add error feedback.
                throw new Error(`${statusCode}: ${message}`);
            }
        }
    }

    function sortList(order: ContactsListActionSort["payload"]) {
        dispatch({
            type: ContactsListActions.Sort,
            payload: order,
        });
    }

    async function addContact(data: ContactActionAdd["payload"]) {
            const { message, statusCode } = await addContactData(data);
            if (statusCode === StatusCodes.CREATED) {
                // TODO: Add success feedback.
                console.log(message);

                dispatch({
                    type: ContactActions.Create,
                    payload: data,
                });
            } else {
                // TODO: Add error feedback.
                throw new Error(`${statusCode}: ${message}`);
            }
    }

    async function getContact(id: ContactSchema["id"]) {
        if (state.list.length > 0) {
            return state.list.find((contact) => contact.id === id);
        } else {
            const { message, statusCode, data } = await getContactData(id);

            if (statusCode === StatusCodes.OK) {
                // TODO: Add success feedback.
                console.log(message);
                return data;
            } else {
                // TODO: Add error feedback.
                throw new Error(`${statusCode}: ${message}`);
            }
        }
    }

    async function editContact(data: ContactActionEdit["payload"]) {
        const { statusCode, message } = await updateContactData(data);

        if (statusCode === StatusCodes.CREATED) {
            // TODO: Add success feedback.
            console.log(message);

            dispatch({
                type: ContactActions.Update,
                payload: data,
            });
        } else {
            // TODO: Add error feedback.
            throw new Error(`${statusCode}: ${message}`);
        }
    }

    async function removeContact(id: ContactActionRemove["payload"]) {
        const { statusCode, message } = await deleteContactData(id);

        if (statusCode === StatusCodes.OK) {
            // TODO: Add success feedback.
            console.log(message);

            dispatch({
                type: ContactActions.Destroy,
                payload: id,
            });
        } else {
            // TODO: Add error feedback.
            throw new Error(`${statusCode}: ${message}`);
        }
    }

    return (
        <ContactsContext.Provider
            value={{
                state,

                getList,
                sortList,

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
