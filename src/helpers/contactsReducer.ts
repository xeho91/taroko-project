import type { ContactsState } from "$helpers/ContactsContext";
import type { ContactSchema } from "$types";

export enum ContactsListActions {
    Set = "SET LIST",
    Sort = "SORT LIST",
}

export enum ContactActions {
    Create = "ADD CONTACT",
    Update = "EDIT CONTACT",
    Destroy = "REMOVE CONTACT",
}

export interface ContactsListActionSet {
    type: ContactsListActions.Set;
    payload: ContactSchema[];
}

export interface ContactsListActionSort {
    type: ContactsListActions.Sort;
    payload: ContactsState["sortOrder"];
}

type ContactsListAction =
    | ContactsListActionSet
    | ContactsListActionSort;

// TODO:
// Not a TypeScript pro yet,
// but I know is possible to make this less verbose.
// With "mapping" and generics?
// Need to do research.
export interface ContactActionAdd {
    type: ContactActions.Create;
    payload: Omit<ContactSchema, "id">;
}

export interface ContactActionEdit {
    type: ContactActions.Update;
    payload: ContactSchema;
}

export interface ContactActionRemove {
    type: ContactActions.Destroy;
    payload: ContactSchema["id"];
}

type ContactAction =
    | ContactActionAdd
    | ContactActionEdit
    | ContactActionRemove;

function reducer(
    state: ContactsState,
    action: ContactAction | ContactsListAction,
): ContactsState {
    switch (action.type) {
        case ContactsListActions.Set: {
            const list = action.payload;

            return {
                ...state,
                list,
            };
        }

        case ContactsListActions.Sort: {
			const order = action.payload;
			let sortedList: ContactSchema[];

			if (order === "ascending") {
				sortedList = state.list.sort((a, b) => {
					return a.first_name.localeCompare(b.first_name);
				});
			} else if (order === "descending") {
				sortedList = state.list.sort((a, b) => {
					return b.first_name.localeCompare(a.first_name);
				});
			} else {
				sortedList = state.list;
			}

            return {
                ...state,
                list: sortedList,
				sortOrder: order,
            };
        }

        case ContactActions.Create: {
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

        case ContactActions.Update: {
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

        case ContactActions.Destroy: {
            const contactId = action.payload;
            const updatedList = state.list.filter(({ id }) => id !== contactId);

            state.deletedIds.push(contactId);

            return {
                ...state,
                list: updatedList,
            };
        }

        default:
            return state;
    }
}

export default reducer;
