import React from 'react'
import styles from "@/styles/Home.module.scss";
import Hero from '../../components/Hero'
import imgError from "@/assets/images/error.jpg";
import Controls from '@/components/Controls';
import { Loader } from '@/assets/icons/Loader';
import Pagination from '@/components/Pagination';
import { useSelector } from 'react-redux';
import { setPageCharacters } from '@/features/slices/userSelectionsSlice';

const CharacterGrid = React.lazy(() => import("@/components/Grid/CharacterGrid"));

const Characters = () => {

    const { loading, error } = useSelector((state: any) => state.userSelections);
    const filters = useSelector((state: any) => state.userSelections.filters);
    const info_characters = useSelector((state: any) => state.userSelections.info_characters);

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
                    <CharacterGrid />
                    <Pagination
                        filters={filters}
                        page={filters.page_characters}
                        setPage={setPageCharacters}
                        info={info_characters}
                    />
                </React.Suspense>
            </div>
        </main>
    )
}

export default Characters