import { LocationModel } from "@/types/LocationModel";
import { LOCATION } from "@/utils/getCharacters";
import { useEffect, useState } from "react";
import styles from "@/components/CharacterInfo/CharacterInfo.module.scss"

export const LocationsGridAccordion = ({
    locationId
}: {
    locationId: string;
}) => {

    const [location, setLocation] = useState({} as LocationModel);

    const fetchLocation = async () => {
        try {
            const response = await fetch(`${LOCATION}/${locationId}`);
            const data = await response.json();
            setLocation(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        // get character info from api
        fetchLocation();
    }, [locationId]);

    return (
        <a
            href={`/location/${locationId}`}
            className={styles.gridInner}
        >
            {`${location.name}`}
        </a>
    );
}