import React from "react";
import { UserContext } from "@/context";
import Card from "@/components/Card";
import styles from "./CharacterGrid.module.scss";

const CharacterGrid = () => {
	const { characters, changeModalCharacter } = React.useContext(UserContext);
	return (
		<section id="characters" className={styles.characters} onClick={changeModalCharacter}>
			{characters && characters.map((character, i) => <Card key={i} character={character} />)}
		</section>
	);
};

export default CharacterGrid;