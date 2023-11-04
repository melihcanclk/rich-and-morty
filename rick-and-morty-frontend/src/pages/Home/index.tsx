import React from 'react'
import styles from "./Home.module.scss";
import Hero from '../../components/Hero'
import { UserContext } from "@/context";
import imgError from "@/assets/images/error.jpg";
import Controls from '@/components/Controls';
import { Loader } from '@/assets/icons/Loader';


const CharacterGrid = React.lazy(() => import("@/components/CharacterGrid"));

const Home = () => {

    const { error, loading } = React.useContext(UserContext);

    return (
        <main>
            <Hero />
            <Controls />
            <React.Suspense fallback={<Loader />}>
                {!loading && error && (
                    <div className={styles.error}>
                        <img src={imgError} alt="Error" />
                        <p aria-live="assertive">{error}</p>
                    </div>
                )}
                {
                    <CharacterGrid />
                /*<Pagination />
                <Footer />
                <Modal /> */}
            </React.Suspense>
        </main>
    )
}

export default Home