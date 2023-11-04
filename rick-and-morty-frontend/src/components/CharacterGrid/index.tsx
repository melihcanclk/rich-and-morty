import Card from "@/components/Card";
import styles from "./CharacterGrid.module.scss";
import { CharacterModel } from "@/types";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const CharacterGrid = () => {
	const { characters,  error, loading } = useSelector((state: RootState) => state.userSelections);

	return (
		<section id="characters" className={styles.characters} >
			{loading && <div className="skeleton" />}
			{error && <div className="error">{error}</div>}
			{characters?.map((character: CharacterModel) => (
				<Card key={character.id} character={character} />
			))}
		</section>
	);
};

export default CharacterGrid;