type CRUDcolors =
    | "create"
    | "receive"
    | "update"
    | "destroy";

type ConfirmationColors = "confirm" | "deny";

export type ButtonColor =
    | "default"
	| CRUDcolors
	| ConfirmationColors
