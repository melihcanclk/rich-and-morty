import React from 'react'
import styles from "./MainLayout.module.scss";
import imgError from "@/assets/images/error.jpg";
import { Loader } from '@/assets/icons/Loader';
import { useSelector } from 'react-redux';

const MainLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    const { loading, error } = useSelector((state: any) => state.userSelections);

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
            </div>
        </main>
    )
}

export default MainLayout