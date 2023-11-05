import { useEffect, useState } from "react";
import styles from "@/components/LocationInfo/LocationInfo.module.scss"
import Accordion from "@/components/Accordion";
import { LOCATION } from "@/utils/getCharacters";
import { LocationModel } from "@/types/LocationModel";
import { CharacterGridAccordion } from "./CharacterGridAccordion";
import { GridContainer } from "@/components/LocationInfo/GridContainer";

const LocationInfo = ({ id }: { id: string }) => {

    // display character info
    const [locationInfo, setLocationInfo] = useState({} as LocationModel);
    const fetchLocationInfo = async () => {
        try {
            const response = await fetch(`${LOCATION}/${id}`);
            const data = await response.json();
            setLocationInfo(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        // get character info from api
        fetchLocationInfo();
    }, [id]);

    return (
        <div className={styles.locationInfo}>
            <div>
                <h1>
                    {locationInfo.name}
                </h1>

                <div className={styles.info}>
                    Location Type: {locationInfo.type}
                    <br />
                    Location Dimension: {locationInfo.dimension}
                    <br />
                    Location Created: {
                        new Date(locationInfo.created).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })
                    }
                    <br />
                </div>
            </div>
            <div className={styles.residents}>
                <Accordion
                    title="Residents"
                    content={
                        <GridContainer>
                            {locationInfo.residents?.map((character: any, key) => {
                                const characterId = character.split("/").pop();
                                return <CharacterGridAccordion characterId={characterId} key={key} />;
                            })}
                        </GridContainer>
                    }
                />
            </div>
        </div>
    );
};

export default LocationInfo;

