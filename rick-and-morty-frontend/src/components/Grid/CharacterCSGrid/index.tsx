import { CharacterModel } from "@/types";
import Grid from "@/components/Grid";
import CharacterCard from "@/components/Cards/CharacterCard";

interface Props {
	characters: CharacterModel[];
}

const CharacterCSGrid = ({ characters }: Props) => {
	console.log(characters);

	return (
		<Grid>
			{characters?.map((character: CharacterModel, key) => (
				<CharacterCard key={key} character={character} />
			))}
		</Grid>
	);
};

export default CharacterCSGrid;