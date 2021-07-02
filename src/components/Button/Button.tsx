import React from "react";

import type { ButtonHTMLAttributes, FunctionComponent } from "$types";

interface ButtonProperties extends ButtonHTMLAttributes<HTMLButtonElement> {
	id?: string;
	label?: string;
}

const Button: FunctionComponent<ButtonProperties> = (props) => {
	const { label, children, ...rest } = props;

	return <button {...rest}>{label || children}</button>;
};

Button.defaultProps = {
	//
};

export default Button;
