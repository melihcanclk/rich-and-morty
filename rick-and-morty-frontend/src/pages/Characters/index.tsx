import React from 'react'
import Hero from '@/components/Hero'
import Controls from '@/components/Controls';
import Pagination from '@/components/Pagination';
import { useSelector } from 'react-redux';
import { setPageCharacters } from '@/features/slices/userSelectionsSlice';

const CharacterGrid = React.lazy(() => import("@/components/Grid/CharacterGrid"));

const Characters = () => {

    const filters = useSelector((state: any) => state.userSelections.filters);
    const info_characters = useSelector((state: any) => state.userSelections.info_characters);

    return (
        <div>
            <Hero />
            <Controls />

            <CharacterGrid />
            <Pagination
                filters={filters}
                page={filters.page_characters}
                setPage={setPageCharacters}
                info={info_characters}
            />
        </div>
    )
}

export default Characters