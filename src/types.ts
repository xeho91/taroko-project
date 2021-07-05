export type {
    ButtonHTMLAttributes,
    ChangeEvent,
    Dispatch,
    FormEvent,
    FunctionComponent,
    HTMLProps,
    MutableRefObject,
} from "react";
export type { LinkProps, RouteComponentProps, RouteProps } from "react-router-dom";

export type {
    ContactActionAdd,
    ContactActionEdit,
    ContactActionGet,
    ContactActionRemove,
    ContactActionType,
} from "$reducer";

export interface ContactSchema {
    id: number;
    first_name: string;
    last_name: string;
    job: string;
    description: string;
}

export interface ContactsState {
    list: ContactSchema[];
	deletedIds: number[];
}

export interface IconifyIcon {
    body: string;
    left?: number;
    top?: number;
    width?: number;
    height?: number;
    rotate?: number;
    hFlip?: boolean;
    vFlip?: boolean;
}
