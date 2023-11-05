
import styles from "./EpisodeCard.module.scss";
import React from "react";
import { EpisodeModel } from "@/types/EpisodeModel";
import { getEpisode } from "@/utils/getSeason";

interface Props {
    episode: EpisodeModel;
}

const EpisodeCard: React.FC<Props> = ({ episode }) => {
    const { season, episode: episodeNumber } = getEpisode(episode.episode);

    return (
        <div>
            <a
                id={`episode-${episode?.id}`}
                key={episode?.id}
                className={`${styles.episode}`}
                title={`See details of ${episode?.name}`}
                href={`/episode/${episode?.id}`}
            >
                <div className={styles.info} >
                    Episode Name: {episode.name}
                    <br />
                    Episode Created: {
                        new Date(episode.created).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })
                    }
                    <br />
                    Episode Air Date: {episode.air_date}
                    <br />
                    Season: {season}
                    <br />
                    Episode: {episodeNumber}
                    <br />
                </div>
            </a>
        </div>

    );
};

export default EpisodeCard;