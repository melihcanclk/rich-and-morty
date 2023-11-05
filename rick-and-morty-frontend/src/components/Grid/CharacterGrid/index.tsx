import { CharacterModel } from "@/types";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import Grid from "@/components/Grid";
import CharacterCard from "@/components/Cards/CharacterCard";

const CharacterGrid = () => {
	const { characters } = useSelector((state: RootState) => state.userSelections);

	return (
		<div>
			<Grid>
				{characters?.map((character: CharacterModel) => (
					<CharacterCard key={character.id} character={character} />
				))}
			</Grid>
		</div>
	);
};

export default CharacterGrid;