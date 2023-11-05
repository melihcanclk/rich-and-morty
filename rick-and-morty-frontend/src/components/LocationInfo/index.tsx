import { useEffect, useState } from "react";
import styles from "@/components/LocationInfo/LocationInfo.module.scss"
import { CharacterModel } from "@/types";
import Accordion from "@/components/Accordion";
import { CHARACTER, LOCATION } from "@/utils/getCharacters";
import { LocationModel } from "@/types/LocationModel";

const CharacterGrid = ({
    characterId
}: {
    characterId: string;
}) => {
    // fetch character
    const [character, setCharacter] = useState({} as CharacterModel);
    const fetchCharacter = async () => {
        try {
            const response = await fetch(`${CHARACTER}/${characterId}`);
            const data = await response.json();
            setCharacter(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        // get character info from api
        fetchCharacter();
    }, [characterId]);

    return (
        <a
            href={`/character/${characterId}`}
            className={styles.gridInner}
        >
            <img
                src={character.image}
                alt={character.name}
                className={styles.img}
                width={150}
                height={150}
            />

            {`${character.name}`}
        </a>
    );
}

const GridContainer = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className={styles.gridContainer}>
            {children}
        </div>
    );
}

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
                                return <CharacterGrid characterId={characterId} key={key} />;
                            })}
                        </GridContainer>
                    }
                />
            </div>
        </div>
    );
};

export default LocationInfo;

