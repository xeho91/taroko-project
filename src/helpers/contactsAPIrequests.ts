import type { ContactSchema } from "$types";
import type { StatusCodes } from "http-status-codes";

interface APIresponse {
    statusCode: StatusCodes;
    message: string;
    data: ContactSchema | ContactSchema[];
}

function setURL(id?: ContactSchema["id"]) {
    const baseAPIurl = "https://taroko-contacts-server.herokuapp.com/api/contacts";

    return `${baseAPIurl}/${id || ""}`;
}

const headers = {
    "accept": "application/json",
    "Content-Type": "application/json",
};

export async function getListData(): Promise<APIresponse> {
    const request = await fetch(setURL(), {
        method: "GET",
        headers,
    });
    let response = await request.json();

    return response as APIresponse;
}

export async function getContactData(id: ContactSchema["id"]): Promise<APIresponse> {
    const request = await fetch(setURL(id), {
        method: "GET",
        headers,
    });
    const response = await request.json();

    return response as APIresponse;
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

