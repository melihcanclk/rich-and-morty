import * as React from "react";
import styles from "./Modal.module.scss";

import { Close } from "@/assets/icons/Close";

const Modal = ({
    children, modal, closeModal
}: {
    children: React.ReactNode,
    modal: boolean,
    closeModal: () => void
}) => {
    const asideRef = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
        if (modal) setTimeout(() => asideRef.current?.focus(), 100);
    }, [modal]);

    const handleCloseModal = () => {
        closeModal()
    };

    return (
        <>
            <button
                className={`${styles.overlay} ${modal ? styles.visible : ""}`}
                onClick={handleCloseModal}
                aria-hidden={!modal}
                tabIndex={-1}
                type="button"
            />
            <aside
                ref={asideRef}
                className={`${styles.modal} ${modal ? styles.open : ""}`}
                aria-hidden={!modal}
                tabIndex={0}
            >
                <div className={styles.modal__content}>
                    <button
                        className={styles.modal__content_close}
                        onClick={handleCloseModal}
                        aria-label="Close modal"
                        title="Close modal"
                    >
                        <Close />
                    </button>

                    {children}
                </div>
            </aside>
        </>
    );
};

export default Modal;