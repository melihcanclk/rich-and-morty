import { CharacterModel } from "@/types";
import Grid from "@/components/Grid";
import CharacterCard from "@/components/Cards/CharacterCard";
import PaginationCS from "@/components/PaginationCS";
import React from "react";
import { PAGINATION_LIMIT } from "@/utils/constants";

interface Props {
	characters: CharacterModel[];
}

const CharacterCSGrid = ({ characters }: Props) => {

	const [input, setInput] = React.useState(1);
	// devide the characters array into arrays of ${PAGINATIN_LIMIT} characters 
	const charactersPerPage = characters?.reduce((resultArray: any, item: any, index: number) => {
		const chunkIndex = Math.floor(index / PAGINATION_LIMIT);

		if (!resultArray[chunkIndex]) {
			resultArray[chunkIndex] = []; // start a new chunk
		}

		resultArray[chunkIndex].push(item);

		return resultArray;
	}, []);

	// add info to each array that shows next and prev
	charactersPerPage?.forEach((page: any, index: number) => {
		page.info = {
			count: characters?.length,
			pages: charactersPerPage?.length,
			next: index < charactersPerPage?.length - 1 ? index + 2 : null,
			prev: index > 0 ? index : null
		};
	});

	const currentPage = charactersPerPage[input - 1];
	return (
		<>
			<Grid>
				{currentPage?.map((character: CharacterModel) => (
					<CharacterCard key={character.id} character={character} />
				))}

			</Grid>
			<PaginationCS
				input={input}
				setInput={setInput}
				info={charactersPerPage[input - 1]?.info}
			/>
		</>

	);
};

export default CharacterCSGrid;