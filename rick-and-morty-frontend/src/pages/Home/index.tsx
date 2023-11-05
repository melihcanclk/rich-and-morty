import Hero from '@/components/Hero'
import { useSelector } from 'react-redux';
import EpisodeGrid from '@/components/Grid/EpisodeGrid';
import Pagination from '@/components/Pagination';
import { RootState } from '@/store/store';
import { setPageEpisodes } from '@/features/slices/userSelectionsSlice';


const Home = () => {
    const filters = useSelector((state: RootState) => state.userSelections.filters);
    const info_episodes = useSelector((state: RootState) => state.userSelections.info_episodes);

    return (
        <div >
            <Hero />
            <EpisodeGrid />
            <Pagination
                filters={filters}
                page={filters.page_episodes}
                setPage={setPageEpisodes}
                info={info_episodes}
            />
        </div>
    )
}

export default Home