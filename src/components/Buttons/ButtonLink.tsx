import React from "react";
import { Link } from "react-router-dom";
import styles from "./buttons.module.scss";

import type { FunctionComponent, LinkProps } from "$types";
import type { ButtonColor } from "./buttons.types";

interface ButtonLinkProps extends LinkProps {
    color?: ButtonColor;
    to: string;
    label: string;
}

const ButtonLink: FunctionComponent<ButtonLinkProps> = (props) => {
    const { to, color, label, className, ...restProps } = props;
    const classNames = [
        styles.buttonLink,
        color && styles[color],
        className,
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

export default ButtonLink;
