import { InlineIcon } from "@iconify/react";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.scss";

import type {
    ButtonHTMLAttributes,
    FunctionComponent,
    IconifyIcon,
    LinkProps,
} from "$types";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    color?: "default" | "red" | "green" | "blue";
}

export const Button: FunctionComponent<ButtonProps> = (props) => {
    const { label, color, children, className, ...restProps } = props;
    const classNames = [
		styles.button,
		color && styles[color],
		className
	].join(" ");

    return (
        <button
            {...restProps}
            className={classNames}
        >
            {label || children}
        </button>
    );
};

Button.defaultProps = {
    color: "default",
};

interface ButtonLinkProps extends LinkProps {
    to: string;
    label: string;
    color?: "default" | "red" | "green" | "blue";
}

export const ButtonLink: FunctionComponent<ButtonLinkProps> = (props) => {
    const { to, color, label, className, ...restProps } = props;
    const classNames = [
		styles.buttonLink,
		color && styles[color],
		className
	].join(" ");

    return (
        <Link
            to={to}
            className={classNames}
            {...restProps}
        >
            {label}
        </Link>
    );
};

ButtonLink.defaultProps = {
    color: "default",
};

interface ButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: IconifyIcon;
    color?: "default" | "red" | "green" | "blue";
}

export const ButtonIcon: FunctionComponent<ButtonIconProps> = (props) => {
    const { icon, color, className, ...restProps } = props;
    const classNames = [
		styles.buttonIcon,
		color && styles[color],
		className
	].join(" ");

    return (
        <button
            {...restProps}
            className={classNames}
        >
            <InlineIcon icon={icon} />
        </button>
    );
};

ButtonIcon.defaultProps = {
    color: "default",
};
