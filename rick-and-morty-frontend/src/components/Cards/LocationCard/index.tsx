
import styles from "@/components/Cards/LocationCard/LocationCard.module.scss";
import React from "react";
import { LocationModel } from "@/types/LocationModel";

interface Props {
    location: LocationModel;
}

const LocationCard: React.FC<Props> = ({ location }) => {
    return (
        <div>
            <a
                id={`location-${location?.id}`}
                key={location?.id}
                className={`${styles.location}`}
                title={`See details of ${location?.name}`}
                href={`/location/${location?.id}`}
            >

                <div className={styles.info}>
                    Location Name: {location.name}
                    <br />
                    Location Type: {location.type}
                    <br />
                    Location Dimension: {location.dimension}
                    <br />
                    Location Created: {
                        new Date(location.created).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })
                    }
                    <br />
                </div>
            </a >
        </div >
    );
};

export default LocationCard;