import React from "react";
import style from "./EpisodeInfo.module.scss"
import { EpisodeModel } from "@/types/EpisodeModel";
import CharacterCSGrid from "../Grid/CharacterCSGrid";
import { CharacterModel } from "@/types";
import { BASE_URL } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setCharacters, setPageCharacters } from "@/features/slices/userSelectionsSlice";

const EpisodeInfo = ({ id }: { id: string }) => {

    const [episode, setEpisode] = React.useState<EpisodeModel>({} as EpisodeModel);
    const userSelections = useSelector((state: RootState) => state.userSelections);
    const dispatch = useDispatch();

    React.useEffect(() => {
        fetch(`${BASE_URL}/episode/${id}`)
            .then((response) => response.json())
            .then((data) => setEpisode(data));
    }, [id]);

    React.useEffect(() => {
        // after episode is fetched, fetch characters
        if (episode.characters) {
            // fetch episode characters promise all
            const promises = episode.characters.map((character) =>
                fetch(character).then((response) => response.json())
            );

            Promise.all(promises).then((data) => dispatch(setCharacters(data as CharacterModel[])));
        }
    }, [episode]);

    const season = episode.episode?.split("E")[0].split("S")[1];
    const episodeNumber = episode.episode?.split("E")[1];

    return (
        <div className={style.episodeInfo}>
            <h1>Episode {id}</h1>

            <div className={style.episodeInfo__details}>
                <div className={style.episodeInfo__details__item}>
                    <h2>Name</h2>
                    <p>{episode.name}</p>
                </div>
                <div className={style.episodeInfo__details__item}>
                    <h2>Air date</h2>
                    <p>{episode.air_date}</p>
                </div>
                <div className={style.episodeInfo__details__item}>
                    <p>Season {season} </p>
                    <p>Episode {episodeNumber}</p>
                </div>
            </div>
            <div className={style.episodeInfo__characters}>
                <h2>Characters</h2>
            </div>
            <CharacterCSGrid characters={userSelections.characters} />

        </div>
    );
};

export default EpisodeInfo;