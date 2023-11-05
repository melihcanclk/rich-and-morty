import LocationCard from "@/components/Cards/LocationCard";
import Grid from "@/components/Grid";
import { useSelector } from "react-redux";

const LocationsGrid = () => {

    const { locations } = useSelector((state: any) => state.userSelections);
    return (
        <>
            <Grid>
                {locations?.map((location: any) => (
                    <LocationCard location={location} key={location.id} />
                ))}
            </Grid>
        </>
    );
};

export default LocationsGrid;