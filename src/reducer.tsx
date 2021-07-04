import { ContactSchema, ContactsState } from "$types";

export enum ContactActionType {
    Create = "ADD",
    Retrieve = "GET",
    Update = "EDIT",
    Delete = "REMOVE",
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

function reducer(state: ContactsState, action: ContactAction): ContactsState {
    switch (action.type) {
        case ContactActionType.Create: {
            const id = state.list.length + 1;
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
