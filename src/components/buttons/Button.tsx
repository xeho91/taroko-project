import React from "react";
import styles from "./buttons.module.scss";

import type { ButtonHTMLAttributes, FunctionComponent } from "react";
import type { ButtonColor } from "./buttons.types";

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement | HTMLInputElement>
{
    color?: ButtonColor;
    label?: string;
}

const Button: FunctionComponent<ButtonProps> = (props) => {
    const { label, color, children, className, type, ...restProps } = props;
    const classNames = [
        styles.button,
        color && styles[color],
        className,
    ].join(" ");

    if (type === "submit") {
        return (
            <input
                type="submit"
                {...restProps}
                className={classNames}
            >
                {label || children}
            </input>
        );
    } else {
        return (
            <button
                {...restProps}
                className={classNames}
            >
                {label || children}
            </button>
        );
    }
};

Button.defaultProps = {
    color: "default",
};

export default Button;
