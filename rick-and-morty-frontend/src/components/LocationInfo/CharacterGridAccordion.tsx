import { CharacterModel } from "@/types";
import { lazyLoading } from "@/utils";
import { CHARACTER } from "@/utils/getCharacters";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/components/LocationInfo/LocationInfo.module.scss"

export const CharacterGridAccordion = ({
    characterId
}: {
    characterId: string;
}) => {
    // fetch character
    const [character, setCharacter] = useState({} as CharacterModel);
    const imgRef = useRef(null);
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

    React.useEffect(() => {
        if (imgRef.current) {
            lazyLoading(imgRef);
        }
    }, [character]);

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
                ref={imgRef}
            />

            {`${character.name}`}
        </a>
    );
}

