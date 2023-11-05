import React from 'react'
import Hero from '@/components/Hero'
import Pagination from '@/components/Pagination';
import { useSelector } from 'react-redux';
import { setPageLocations } from '@/features/slices/userSelectionsSlice';

const LocationsGrid = React.lazy(() => import("@/components/Grid/LocationsGrid"));

const Locations = () => {

    const filters = useSelector((state: any) => state.userSelections.filters);
    const info_locations = useSelector((state: any) => state.userSelections.info_locations);

    return (
        <div>
            <Hero />
            <LocationsGrid />
            <Pagination
                filters={filters}
                page={filters.page_locations}
                setPage={setPageLocations}
                info={info_locations}
            />
        </div>
    )
}

export default Locations