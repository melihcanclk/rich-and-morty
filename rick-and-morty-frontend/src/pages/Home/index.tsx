import React from 'react'
import styles from "@/styles/Home.module.scss";
import Hero from '../../components/Hero'
import imgError from "@/assets/images/error.jpg";
import Controls from '@/components/Controls';
import { Loader } from '@/assets/icons/Loader';
import Pagination from '@/components/Pagination';
import { useSelector } from 'react-redux';


const Home = () => {
    const { loading, error } = useSelector((state: any) => state.userSelections);

    return (
        <main >
            <div className={styles.main}>
                <Hero />
                <Controls />
                <React.Suspense fallback={<Loader />}>
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

export default Home