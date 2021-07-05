import { ContactSchema, ContactsState } from "$types";

export enum ContactActionType {
    Create = "ADD CONTACT",
    Retrieve = "GET CONTACT",
    Update = "EDIT CONTACT",
    Delete = "REMOVE CONTACT",
}

// TODO:
// Not a TypeScript pro yet,
// but I know is possible to make this less verbose.
// With "mapping" and generics?
// Need to do research.
export interface ContactActionAdd {
    type: ContactActionType.Create;
    payload: Omit<ContactSchema, "id">;
}

export interface ContactActionGet {
    type: ContactActionType.Retrieve;
    payload: ContactSchema["id"];
}

export interface ContactActionEdit {
    type: ContactActionType.Update;
    payload: ContactSchema;
}

export interface ContactActionRemove {
    type: ContactActionType.Delete;
    payload: ContactSchema["id"];
}

type ContactAction =
    | ContactActionAdd
    | ContactActionGet
    | ContactActionEdit
    | ContactActionRemove;

export enum ListActionType {
	Retrieve = "GET LIST",
    Sort = "SORT LIST",
}

export interface ListActionGet {
    type: ListActionType.Retrieve;
}

export interface ListActionSort {
    type: ListActionType.Sort;
}

type ListAction = ListActionGet | ListActionSort;

function reducer(
    state: ContactsState,
    action: ContactAction | ListAction,
): ContactsState {
    switch (action.type) {
        case ContactActionType.Create: {
			let id: number;

			if (state.deletedIds.length > 0) {
				id = state.deletedIds[0];
				state.deletedIds.shift();
			} else {
				id = state.list.length + 1;
			}

            const newContact = {
                id,
                ...action.payload,
            };

            return {
                ...state,
                list: [...state.list, newContact],
            };
        }

        case ContactActionType.Retrieve: {
            const contactId = action.payload;
            const contactData = state.list.find(({ id }) => id === contactId);

            // FIXME: There has to be better handling, when contact not found.
            if (contactData) {
                return {
					...state,
                    list: [contactData],
                };
            } else {
                return state;
            }
        }

        case ContactActionType.Update: {
            const updatedContact = action.payload;
            const updatedList = state.list.map((contact) => {
                if (contact.id === updatedContact.id) {
                    return updatedContact;
                }

                return contact;
            });

            return {
                ...state,
                list: updatedList,
            };
        }

        case ContactActionType.Delete: {
            const contactId = action.payload;
            const updatedList = state.list.filter(({ id }) => id !== contactId);

			state.deletedIds.push(contactId);

            return {
                ...state,
                list: updatedList,
            };
        }

		case ListActionType.Retrieve: {
			return state;
		}

		case ListActionType.Sort: {
			const sortedList = state.list.sort((a, b) => {
				return a.first_name.localeCompare(b.first_name);
			});

			return {
				...state,
				list: sortedList,
			}
		}

        default:
            return state;
    }
}

export default reducer;
