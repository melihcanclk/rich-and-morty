
import styles from "./CharacterCard.module.scss";
import { lazyLoading } from "@/utils";
import React from "react";
import { Heart } from "@/assets/icons/Heart";
import { CharacterModel } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { addFavourite, openModalError, openModalRemove } from "@/features/slices/userSelectionsSlice";
import { BsDot } from "react-icons/bs";
import { PAGINATION_LIMIT } from "@/utils/constants";

interface Props {
    character: CharacterModel;
}

const CharacterCard: React.FC<Props> = ({ character }) => {
    const dispatch = useDispatch();
    const favoriteCount = useSelector((state: any) => state.userSelections.favoriteCount);
    const imgRef = React.useRef<HTMLImageElement>(null);
    console.log(character);
    React.useEffect(() => {
        if (imgRef.current) {
            lazyLoading(imgRef);
        }
    }, [character]);


   const handleOnClickFavorite = (e: React.SyntheticEvent<EventTarget>) => {
        e.stopPropagation();
        e.preventDefault();
        // if character is favorite, open modal
        if (character.isFavorite) {
            dispatch(openModalRemove(character));
        } else {
            if (favoriteCount < PAGINATION_LIMIT) {
                dispatch(addFavourite(character));
            } else {
                dispatch(openModalError(character));
            }
        }
    };

    return (
        <div>
            <a
                id={`character-${character?.id}`}
                key={character?.id}
                className={`${styles.character} skeleton`}
                title={`See details of ${character?.name}`}
                href={`/character/${character?.id}`}
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
                <p className={styles.character__status}>
                    {
                        character?.status === "Alive" ? <BsDot style={{
                            color: "green"
                        }} /> : character?.status === "Dead" ? <BsDot style={{
                            color: "red"
                        }} /> : <BsDot style={{
                            color: "gray"
                        }} />}
                    {character?.status} - {character?.species} - {character?.gender}
                </p>
                {character?.image && <p className={styles.name}>{character.name}</p>}
            </a >

        </div >
    );
};

export default CharacterCard;