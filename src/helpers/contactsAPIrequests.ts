import type { ContactSchema } from "$types";
import type { StatusCodes } from "http-status-codes";

interface APIresponse {
    statusCode: StatusCodes;
    message: string;
}
interface APIresponseList extends APIresponse {
    data: ContactSchema[];
}
interface APIresponseContact extends APIresponse {
    data: ContactSchema;
}

function setURL(id?: ContactSchema["id"]) {
    const baseAPIurl = import.meta.env["VITE_API_URL"];

	if (baseAPIurl && typeof baseAPIurl === "string") {
		return `${baseAPIurl}/${id || ""}`;
	} else {
		throw new Error("The Environment variable - 'VITE_API_URL' is not defined!");
	}
}

const headers = {
    "accept": "application/json",
    "Content-Type": "application/json",
};

export async function getListData(): Promise<APIresponseList> {
    const request = await fetch(setURL(), {
        method: "GET",
        headers,
    });
    const response = await request.json();

    return response as APIresponseList;
}

export async function getContactData(id: ContactSchema["id"]): Promise<APIresponseContact> {
    const request = await fetch(setURL(id), {
        method: "GET",
        headers,
    });
    const response = await request.json();

    return response as APIresponseContact;
}

export async function addContactData(data: Omit<ContactSchema, "id">): Promise<APIresponse> {
    const request = await fetch(setURL(), {
        method: "POST",
        headers,
        body: JSON.stringify({ contact: data }),
    });
    const response = await request.json();

    return response as APIresponse;
}

export async function updateContactData(data: ContactSchema): Promise<APIresponse> {
    const request = await fetch(setURL(data.id), {
        method: "PATCH",
        headers,
        body: JSON.stringify({ contact: data }),
    });
    const response = await request.json();

    return response as APIresponse;
}

export async function deleteContactData(id: ContactSchema["id"]): Promise<APIresponse> {
    const request = await fetch(setURL(id), {
        method: "DELETE",
        headers,
    });
    const response = await request.json();

    return response as APIresponse;
}
