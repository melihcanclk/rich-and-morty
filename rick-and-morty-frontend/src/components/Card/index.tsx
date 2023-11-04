
import { UserContext } from "@/context";
import styles from "./Card.module.scss";
import imgError from "@/assets/img/error.png";
import { lazyLoading } from "@/utils";
import React from "react";
import { Heart } from "@/assets/icons/Heart";
import { CharacterModel } from "@/types";
const clicked = "character";

interface Props {
    character: CharacterModel;
}

const Card: React.FC<Props> = ({ character }) => {
    const { lastFocus, modal, setFavorite, removeFavorite } = React.useContext(UserContext);
    const imgRef = React.useRef<HTMLImageElement>(null);

    React.useEffect(() => {
        if (imgRef.current) {
            lazyLoading(imgRef);
        }
    }, [character]);

    React.useEffect(() => {
        if (!modal && lastFocus) {
            const character = document.getElementById(lastFocus);
            if (character) {
                character.focus();
            }
        }
    }, [lastFocus, modal]);

    const handleOnClickFavorite = (e: React.SyntheticEvent<EventTarget>) => {
        e.stopPropagation();
        e.preventDefault();
        character.isFavorite ? removeFavorite(character) : setFavorite(character);
    };

    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" || e.key === " ") {
            e.stopPropagation();
            e.preventDefault();

            character.isFavorite ? removeFavorite(character) : setFavorite(character);
        }
    };

    return (
        <button
            id={`character-${character?.id}`}
            key={character?.id}
            className={`${styles.character} skeleton`}
            data-id={character?.id}
            data-image={character?.image || imgError}
            aria-label={`Name of the character is ${character?.name}`}
            data-location={character?.location?.name}
            data-name={character?.name}
            data-origin-name={character?.origin?.name}
            data-origin-url={character?.origin?.url}
            data-status={character?.status}
            data-species={character?.species}
            data-type={character?.type}
            data-gender={character?.gender}
            data-is-favorite={character?.isFavorite}
            data-clicked-from={clicked}
            title={`See details of ${character?.name}`}
            type="button"
        >
            {character?.image &&
                (character?.isFavorite ? (
                    <div
                        title="Remove from favorites"
                        className={styles.favorite}
                        onClick={handleOnClickFavorite}
                        onKeyDown={handleOnKeyDown}
                        tabIndex={0}
                    >
                        <Heart />
                    </div>
                ) : (
                    <div
                        title="Add to favorites"
                        onClick={handleOnClickFavorite}
                        onKeyDown={handleOnKeyDown}
                        tabIndex={0}
                    >
                        <Heart />
                    </div>
                ))}
            <img
                className="hide"
                data-src={character?.image}
                alt={character?.name}
                width={200}
                height={200}
                ref={imgRef}
            />
            {character?.image && <p>{character.name}</p>}
        </button>
    );
};

export default Card;