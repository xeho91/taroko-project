import React, { useEffect, useState } from "react";
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

    const [visible, setVisible] = useState(true);

    useEffect(() => {
		const timer = setTimeout(() => {
			setVisible(false);
			onConfirm();
		}, timeout);

		return () => {
			clearTimeout(timer);
		};
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
            <div
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
        );
    } else {
        return null;
    }
};

ConfirmDialog.defaultProps = {
	timeout: 3000,
};

export default ConfirmDialog;
