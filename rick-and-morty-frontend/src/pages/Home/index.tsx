import React from 'react'
import styles from "@/styles/Home.module.scss";
import Hero from '../../components/Hero'
import imgError from "@/assets/images/error.jpg";
import Controls from '@/components/Controls';
import { Loader } from '@/assets/icons/Loader';
import { useSelector } from 'react-redux';
import EpisodeGrid from '@/components/Grid/EpisodeGrid';
import Pagination from '@/components/Pagination';
import { RootState } from '@/store/store';
import { setPageEpisodes } from '@/features/slices/userSelectionsSlice';


const Home = () => {
    const { loading, error } = useSelector((state: any) => state.userSelections);
    const filters = useSelector((state: RootState) => state.userSelections.filters);
    const info_episodes = useSelector((state: RootState) => state.userSelections.info_episodes);

    return (
        <main >
            <div className={styles.main}>
                <Hero />
                <React.Suspense fallback={<Loader />}>
                    {!loading && error && (
                        <div className={styles.error}>
                            <img src={imgError} alt="Error" />
                            <p aria-live="assertive">{error}</p>
                        </div>
                    )}
                    <EpisodeGrid />
                    <Pagination
                        filters={filters}
                        page={filters.page_episodes}
                        setPage={setPageEpisodes}
                        info={info_episodes}
                    />

                </React.Suspense>
            </div>
        </main>
    )
}

export default Home