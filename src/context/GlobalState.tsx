import { Contact, FunctionComponent } from "$types";
import React, { createContext, useReducer } from "react";
import appReducer from "./AppReducer";

const urlAPI = "https://taroko-contacts-server.herokuapp.com/api/contacts";

async function requestContactsList() {
	const request = await fetch(urlAPI, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	const response = await request.json();
	const { data } = await response;

	return data as Contact[];
}

const initialState = {
	list: await requestContactsList(),
};

export const GlobalContext = createContext(initialState);
export const GlobalProvider: FunctionComponent = ({ children }) => {
	const [state, dispatch] = useReducer(appReducer, initialState);

	async function addContact(contact: Contact) {
		const request = await fetch(urlAPI, {
			method: "post",
			body: JSON.stringify({ contact }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const response = await request.json();
		const status = await response.statusCode;

		if (status === 201) {
			dispatch({
				type: "ADD_CONTACT",
				payload: contact,
			});
		}
	}

	async function editContact(contact: Contact) {
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
			dispatch({
				type: "EDIT_CONTACT",
				payload: contact,
			});
		}
	}

	async function removeContact(contact: Contact) {
		const { id } = contact;
		const request = await fetch(`${urlAPI}/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const response = await request.json();
		const { statusCode } = await response;

		if (statusCode === 200) {
			dispatch({
				type: "REMOVE_CONTACT",
				payload: contact,
			});
		}
	}

	return (
		<GlobalContext.Provider
			value={{
				list: state.list,
				addContact,
				editContact,
				removeContact,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
