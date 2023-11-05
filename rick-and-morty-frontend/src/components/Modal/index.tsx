import * as React from "react";
import styles from "./Modal.module.scss";
import { useDispatch } from "react-redux";

import { Close } from "@/assets/icons/Close";
import { AnyAction } from "redux";

const Modal = ({
    children, modal, closeModal
}: {
    children: React.ReactNode,
    modal: boolean,
    closeModal: () => AnyAction
}) => {
    const dispatch = useDispatch();
    const asideRef = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
        if (modal) setTimeout(() => asideRef.current?.focus(), 100);
    }, [modal]);

    const handleCloseModal = () => {
        dispatch(closeModal());
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