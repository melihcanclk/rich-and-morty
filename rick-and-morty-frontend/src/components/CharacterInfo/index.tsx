import { useEffect, useState } from "react";
import style from "./CharacterInfo.module.scss"
import { CharacterModel } from "@/types";
import Accordion from "@/components/Accordion";

const EpisodeGrid = ({
    episode
}: {
    episode: string;
}) => {
    return (
        <a
            href={`/episode/${episode}`}
            className={style.gridInner}
        >
            {`Episode ${episode}`}
        </a>
    );
}

const GridContainer = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className={style.gridContainer}>
            {children}
        </div>
    );
}

const CharacterInfo = ({ id }: { id: string }) => {

    // display character info
    const [characterInfo, setCharacterInfo] = useState({} as CharacterModel);
    console.log(characterInfo)
    const fetchCharacterInfo = async () => {
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
            const data = await response.json();
            setCharacterInfo(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        // get character info from api
        fetchCharacterInfo();
    }, [id]);

    return (
        <div className={style.characterInfo}>
            <div>
                <h1>
                    {characterInfo.name}
                </h1>
                <img src={characterInfo.image} alt={characterInfo.name} />
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
                    Last known location: {characterInfo.location?.name}
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
            <div className={style.episodes}>
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
            </div>
        </div>
    );
};

export default CharacterInfo;