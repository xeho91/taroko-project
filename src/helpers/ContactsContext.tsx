import contactsReducer, {
    ContactActions,
    ContactsListActions,
} from "$helpers/contactsReducer";
import { StatusCodes } from "http-status-codes";
import React, { createContext, useEffect, useReducer, useState } from "react";
import {
    addContactData,
    deleteContactData,
    getContactData,
    getListData,
    updateContactData,
} from "./contactsAPIrequests";

import type {
    ContactsListActionGet,
    ContactsListActionSort,
} from "$helpers/contactsReducer";
import type {
    ContactActionAdd,
    ContactActionEdit,
    ContactActionGet,
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

    isProcessing: boolean;

    getList: Dispatch<ContactsListActionGet["payload"]>;
    sortList: Dispatch<ContactsListActionSort["payload"]>;

    addContact: Dispatch<ContactActionAdd["payload"]>;
    getContact: Dispatch<ContactActionGet["payload"]>;
    editContact: Dispatch<ContactActionEdit["payload"]>;
    removeContact: Dispatch<ContactActionRemove["payload"]>;
}

const initialState: ContactsState = {
    list: [],
    deletedIds: [],
    sortOrder: "unsorted",
};

export const ContactsContext = createContext<ContactsContextProps>({
    state: initialState,

    isProcessing: false,

    getList: () => undefined,
    sortList: () => undefined,

    addContact: () => undefined,
    getContact: () => undefined,
    editContact: () => undefined,
    removeContact: () => undefined,
});

export const ContactsProvider: FunctionComponent = ({ children }) => {
    const [state, dispatch] = useReducer(contactsReducer, initialState);
    const [isProcessing, setIsProcessing] = useState(false);
    const [dataFetched, setDataFetched] = useState(false);

    useEffect(() => {
        if (!dataFetched && !isProcessing) {
            setIsProcessing(true);

            void getList().then(() => {
                setDataFetched(true);
                setIsProcessing(false);
            });
        }
    }, [dataFetched, isProcessing]);

    async function getList() {
        setIsProcessing(true);

        try {
            const { data, statusCode, message } = await getListData();

            if (statusCode === StatusCodes.OK) {
                // TODO: Add success feedback.
                console.log(message);

                dispatch({
                    type: ContactsListActions.Read,
                    payload: data as ContactSchema[],
                });
            } else {
                // TODO: Add error feedback.
                console.error(statusCode, message);
            }
        } catch (err) {
            throw new Error(err);
        }

        setIsProcessing(false);
    }

    function sortList(order: ContactsListActionSort["payload"]) {
        setIsProcessing(true);

        dispatch({
            type: ContactsListActions.Sort,
            payload: order,
        });

        setIsProcessing(false);
    }

    async function addContact(data: ContactActionAdd["payload"]) {
        setIsProcessing(true);

        try {
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
                console.error(message);
            }
        } catch (err) {
            throw new Error(err);
        }

        setIsProcessing(false);
    }

    // NOTE: This one is not used, so far.
    async function getContact(id: ContactActionGet["payload"]) {
        setIsProcessing(true);

        try {
            const { message, statusCode } = await getContactData(id);

            if (statusCode === StatusCodes.OK) {
                // TODO: Add success feedback.
                console.log(message);

                dispatch({
                    type: ContactActions.Read,
                    payload: id,
                });
            } else {
                // TODO: Add error feedback.
                console.error(message);
            }
        } catch (err) {
            throw new Error(err);
        }

        setIsProcessing(false);
    }

    async function editContact(data: ContactActionEdit["payload"]) {
        setIsProcessing(true);

        try {
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
                console.error(message);
            }
        } catch (err) {
            throw new Error(err);
        }

        setIsProcessing(false);
    }

    async function removeContact(id: ContactActionRemove["payload"]) {
        setIsProcessing(true);

        try {
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
                console.error(message);
            }
        } catch (err) {
            throw new Error(err);
        }

        setIsProcessing(false);
    }

    return (
        <ContactsContext.Provider
            value={{
                state,

                isProcessing,

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
