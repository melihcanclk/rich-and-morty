import React from 'react'
import styles from "@/layout/MainLayout.module.scss";
import imgError from "@/assets/images/error.jpg";
import { Loader } from '@/assets/icons/Loader';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import { clearFavorites, closeModalError, closeModalRemove, closeModalRemoveAll, removeFavorite } from '@/features/slices/userSelectionsSlice';
import { PAGINATION_LIMIT } from '@/utils/constants';

const MainLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    const { loading, error, characterToBeRemoved, modalRemove, modalError, modalRemoveAll } = useSelector((state: any) => state.userSelections);
    const dispatch = useDispatch();

    const handleOnClickCloseRemove = () => {
        dispatch(closeModalRemove());
    }

    const handleOnClickCloseRemoveAll = () => {
        dispatch(closeModalRemoveAll());
    }

    const handleOnClickCloseError = () => {
        dispatch(closeModalError());
    }

    const handleOnClickRemove = () => {
        dispatch(closeModalRemove());
        dispatch(removeFavorite(characterToBeRemoved));
    };

    const handleOnClickRemoveAll = () => {
        dispatch(clearFavorites());
        dispatch(closeModalRemoveAll());
    };

    return (
        <main >
            <div className={styles.main}>
                <React.Suspense fallback={<Loader />}>
                    {children}
                    {!loading && error && (
                        <div className={styles.error}>
                            <img src={imgError} alt="Error" />
                            <p aria-live="assertive">{error}</p>
                        </div>
                    )}
                </React.Suspense>
                <Modal
                    modal={modalRemove}
                    closeModal={handleOnClickCloseRemove}
                    children={
                        <div >
                            <h2>Do you want to remove {characterToBeRemoved?.name} from favorites?</h2>
                            <div className={styles.buttons}>
                                <Button
                                    onClick={handleOnClickCloseRemove}
                                >
                                    <span>Cancel</span>
                                </Button>
                                <Button
                                    className={styles.remove_button}
                                    onClick={handleOnClickRemove}
                                >
                                    <span>Remove from favorites</span>
                                </Button>
                            </div>
                        </div>
                    }
                />
                <Modal
                    modal={modalRemoveAll}
                    closeModal={handleOnClickCloseRemoveAll}
                    children={
                        <div >
                            <h2>Do you want to clear favorites?</h2>
                            <div className={styles.buttons}>
                                <Button
                                    onClick={handleOnClickCloseRemoveAll}
                                >
                                    <span>Cancel</span>
                                </Button>
                                <Button
                                    className={styles.remove_button}
                                    onClick={handleOnClickRemoveAll}
                                >
                                    <span>Clear All</span>
                                </Button>
                            </div>
                        </div>
                    }
                />
                <Modal
                    modal={modalError}
                    closeModal={handleOnClickCloseError}
                    children={
                        <div >
                            <h2>
                                Cannot add {characterToBeRemoved?.name} to favorites.
                                <br />
                                Maximum number of favorites is {PAGINATION_LIMIT}.
                            </h2>
                        </div>
                    }
                />
            </div>
        </main>
    )
}

export default MainLayout