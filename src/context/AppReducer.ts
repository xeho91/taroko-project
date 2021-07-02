import { Contact } from "$types";

export type ActionType = "EDIT_CONTACT" | "ADD_CONTACT" | "REMOVE_CONTACT";

interface Action {
	type: ActionType;
	payload: Contact;
}

interface Context {
	list: Contact[];
}

function appReducer(state: Context, action: Action) {
	switch (action.type) {
		case "ADD_CONTACT":
			return {
				...state,
				list: [...state.list, action.payload],
			};

		case "EDIT_CONTACT": {
			const updatedContact = action.payload;
			const updatedList = state.list.map((contact: Contact) => {
				if (contact.id === updatedContact.id) {
					return updatedContact;
				}

				return contact;
			});

			return { ...state, list: updatedList };
		}

		case "REMOVE_CONTACT":
			return {
				...state,
				list: state.list.filter((contact) => {
					return contact.id !== action.payload.id;
				}),
			};

		default:
			return state;
	}
}

export default appReducer;
