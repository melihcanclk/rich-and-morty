
import styles from "./EpisodeCard.module.scss";
import React from "react";
import { EpisodeModel } from "@/types/EpisodeModel";

interface Props {
    episode: EpisodeModel;
}

const EpisodeCard: React.FC<Props> = ({ episode }) => {
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
                    Episode Code: {episode.episode}
                    <br />
                </div>
            </a>
        </div>

    );
};

export default EpisodeCard;