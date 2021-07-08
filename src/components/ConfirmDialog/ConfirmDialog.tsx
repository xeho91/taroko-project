import React, { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Button } from "../buttons";
import styles from "./ConfirmDialog.module.scss";

import type { FunctionComponent } from "react";

interface ConfirmDialogProps {
    message: string;
    onConfirm: () => void;
    onDeny?: () => void;
    timeout?: number;
}

const ConfirmDialog: FunctionComponent<ConfirmDialogProps> = (props) => {
    const { message, onConfirm, onDeny, timeout } = props;
    const nodeRef = useRef(null);

    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            handleDenyClick();
        }, timeout);

        return () => clearTimeout(timer);
    });

    function handleConfirmClick() {
        onConfirm();
        setVisible(false);
    }

    function handleDenyClick() {
        if (onDeny) {
            onDeny();
        }
        setVisible(false);
    }

    if (visible) {
        return (
            <CSSTransition
                in={visible}
                appear
                nodeRef={nodeRef}
                timeout={1000}
                classNames={{
                    appear: styles["dialog-appear"],
                    appearActive: styles["dialog-appear-active"],
                    exit: styles["dialog-exit"],
                    exitActive: styles["dialog-exit-active"],
                }}
            >
                <div
                    ref={nodeRef}
                    role="dialog"
                    aria-labelledby="confirm-dialog"
                    className={styles.dialog}
                >
                    <div className={styles.container}>
                        <h2 id="confirm-dialog">Confirm the action</h2>
                        <p>{message}</p>

                        <div className={styles.buttons}>
                            <Button
                                onClick={handleDenyClick}
                                color="deny"
                                label="No"
                            />

                            <Button
                                onClick={handleConfirmClick}
                                color="confirm"
                                label="Yes"
                            />
                        </div>
                    </div>
                </div>
            </CSSTransition>
        );
    } else {
        return null;
    }
};

ConfirmDialog.defaultProps = {
    timeout: 5000,
};

export default ConfirmDialog;
