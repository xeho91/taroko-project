import React, { useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { Button } from "../buttons";
import styles from "./ConfirmDialog.module.scss";

import type { FunctionComponent } from "react";

interface ConfirmDialogProps {
    show: boolean;
    message: string;
    onConfirm: () => void;
    onDeny?: () => void;
    autoClose?: boolean;
    autoCloseAfter?: number;
}

const ConfirmDialog: FunctionComponent<ConfirmDialogProps> = (props) => {
    const { show, message, onConfirm, onDeny, autoClose, autoCloseAfter } = props;

    const dialogRef = useRef(null);

    useEffect(() => {
        if (autoClose) {
            const timer = setTimeout(() => {
                handleDenyClick();
            }, autoCloseAfter);

            return () => clearTimeout(timer);
        }
    });

    function handleConfirmClick() {
        onConfirm();
    }

    function handleDenyClick() {
        if (onDeny) {
            onDeny();
        }
    }

    return (
        <CSSTransition
            nodeRef={dialogRef}
            in={show}
            unmountOnExit
            timeout={500}
            classNames={{
                enter: styles["dialog-enter"],
                enterActive: styles["dialog-enter-active"],
                enterDone: styles["dialog-enter-done"],

                exit: styles["dialog-exit"],
                exitActive: styles["dialog-exit-active"],
                exitDone: styles["dialog-exit-done"],
            }}
        >
            <div
                ref={dialogRef}
                role="dialog"
                aria-hidden={!show}
                aria-labelledby="confirm-dialog-title"
                className={`${styles.dialog} ${styles.overlay}`}
            >
                <div className={styles.container}>
                    <h2 id="confirm-dialog-title">Confirm the action</h2>
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
};

ConfirmDialog.defaultProps = {
    autoClose: true,
    autoCloseAfter: 5000,
};

export default ConfirmDialog;
