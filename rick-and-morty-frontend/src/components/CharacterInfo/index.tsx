import { useEffect, useState } from "react";
import styles from "@/components/CharacterInfo/CharacterInfo.module.scss"
import { CharacterModel } from "@/types";
import Accordion from "@/components/Accordion";
import { useDispatch, useSelector } from "react-redux";
import { Heart } from "@/assets/icons/Heart";
import { addFavourite, openModalError, openModalRemove } from "@/features/slices/userSelectionsSlice";
import { PAGINATION_LIMIT } from "@/utils/constants";
import { CHARACTER, LOCATION } from "@/utils/getCharacters";
import { LocationModel } from "@/types/LocationModel";
import React from "react";
import { lazyLoading } from "@/utils";

const EpisodeGrid = ({
    episode
}: {
    episode: string;
}) => {
    return (
        <a
            href={`/episode/${episode}`}
            className={styles.gridInner}
        >
            {`Episode ${episode}`}
        </a>
    );
}

const LocationsGrid = ({
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

const CharacterInfo = ({ id }: { id: string }) => {

    // display character info
    const [characterInfo, setCharacterInfo] = useState({} as CharacterModel);
    const imgRef = React.useRef<HTMLImageElement>(null);
    const favorites: CharacterModel[] = useSelector((state: any) => state.userSelections.favorites);
    const favoriteCount = useSelector((state: any) => state.userSelections.favoriteCount);
    const dispatch = useDispatch();
    const fetchCharacterInfo = async () => {
        try {
            const response = await fetch(`${CHARACTER}/${id}`);
            const data = await response.json();
            // find if character is favorite
            const isFavorite = favorites.find((favorite: CharacterModel) => favorite.id === data.id);
            data.isFavorite = isFavorite ? true : false;
            setCharacterInfo(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        // get character info from api
        fetchCharacterInfo();
    }, [id]);

    React.useEffect(() => {
        if (imgRef.current) {
            lazyLoading(imgRef);
        }
    }, [characterInfo]);

    const handleOnClickFavorite = (e: React.SyntheticEvent<EventTarget>) => {
        e.stopPropagation();
        e.preventDefault();
        // if character is favorite, open modal
        if (characterInfo.isFavorite) {
            dispatch(openModalRemove(characterInfo));
            setCharacterInfo({ ...characterInfo, isFavorite: false });
        } else {
            if (favoriteCount < PAGINATION_LIMIT) {
                dispatch(addFavourite(characterInfo as CharacterModel));
                setCharacterInfo({ ...characterInfo, isFavorite: true });
            } else {
                dispatch(openModalError(characterInfo as CharacterModel));
            }
        }
    };

    return (
        <div className={styles.characterInfo}>
            <div>
                <h1>
                    {characterInfo.name}
                </h1>
                <div
                    id={`character-${characterInfo?.id}`}
                    key={characterInfo?.id}
                    className={`${styles.character} skeleton`}
                    title={`See details of ${characterInfo?.name}`}
                >
                    {characterInfo?.image &&
                        // if character is favorite, show remove icon
                        favorites.find((favorite: CharacterModel) => favorite.id === characterInfo.id) ? (
                        <div
                            title="Remove from favorites"
                            className={styles.favorite}
                            onClick={handleOnClickFavorite}
                            tabIndex={0}
                        >
                            <Heart />
                        </div>
                    ) : (
                        <div
                            title="Add to favorites"
                            onClick={handleOnClickFavorite}
                            tabIndex={0}
                        >
                            <Heart />
                        </div>
                    )}

                    <img
                        src={characterInfo?.image}
                        alt={characterInfo?.name}
                        width={200}
                        height={200}
                        ref={imgRef}
                    />
                </div>
                <p>
                    {
                        characterInfo.status === "Alive" ? <span style={{
                            color: "green"
                        }}>●</span> : characterInfo.status === "Dead" ? <span style={{
                            color: "red"
                        }}>●</span> : <span style={{
                            color: "gray"
                        }}>●</span>

                    }
                    {" "}
                    {characterInfo.status} - {characterInfo.species} - {characterInfo.gender} {characterInfo.type && `- ${characterInfo.type}`}
                </p>
                <p>
                    Origin: {characterInfo.origin?.name}
                </p>
                < p >
                    Created: {new Date(characterInfo.created).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </p>
            </div>
            <div className={styles.episodes}>
                <Accordion
                    title="Episodes"
                    content={
                        <GridContainer>
                            {characterInfo.episode?.map((episode: any) => {
                                episode = episode.split("/").pop();
                                return <EpisodeGrid key={episode} episode={episode} />;
                            })}
                        </GridContainer>
                    }
                />
                <Accordion
                    title="Location"
                    content={
                        <GridContainer>
                            {
                                characterInfo.location?.url &&
                                <LocationsGrid key={characterInfo.location?.url} locationId={characterInfo.location?.url.split("/").pop() ?? ""} />
                            }
                        </GridContainer>
                    }
                />
            </div>
        </div>
    );
};

export default CharacterInfo;

