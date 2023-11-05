
import styles from "./Card.module.scss";
import { lazyLoading } from "@/utils";
import React from "react";
import { Heart } from "@/assets/icons/Heart";
import { CharacterModel } from "@/types";
import { useDispatch } from "react-redux";
import { addFavourite, removeFavorite } from "@/features/slices/userSelectionsSlice";

interface Props {
    character: CharacterModel;
}

const CharacterCard: React.FC<Props> = ({ character }) => {
    const dispatch = useDispatch();
    const imgRef = React.useRef<HTMLImageElement>(null);

    React.useEffect(() => {
        if (imgRef.current) {
            lazyLoading(imgRef);
        }
    }, [character]);


    const handleOnClickFavorite = (e: React.SyntheticEvent<EventTarget>) => {
        e.stopPropagation();
        e.preventDefault();
        character.isFavorite ?
            dispatch(removeFavorite(character)) :
            dispatch(addFavourite(character));
    };

    return (
        <button
            id={`character-${character?.id}`}
            key={character?.id}
            className={`${styles.character} skeleton`}
            title={`See details of ${character?.name}`}
            type="button"
        >
            {character?.image &&
                (character?.isFavorite ? (
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

export default CharacterCard;