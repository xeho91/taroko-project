import { InlineIcon } from "@iconify/react";
import React from "react";
import styles from "./buttons.module.scss";

import type { IconifyIcon } from "$types";
import type { ButtonHTMLAttributes, FunctionComponent } from "react";
import type { ButtonColor } from "./buttons.types";

interface ButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    color?: ButtonColor;
    icon: IconifyIcon;
}

const ButtonIcon: FunctionComponent<ButtonIconProps> = (props) => {
    const { icon, color, className, ...restProps } = props;
    const classNames = [
        styles.buttonIcon,
        color && styles[color],
        className,
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

export default ButtonIcon;
