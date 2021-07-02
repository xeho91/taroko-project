export type { NavProperties } from "$components/Nav/Nav";
export type { Page } from "$pages";

export interface Contact {
	id: number;
	first_name: string;
	last_name: string;
	job: string;
	description: string;
}

export type {
	ButtonHTMLAttributes,
	FunctionComponent,
	MutableRefObject,
} from "react";

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
