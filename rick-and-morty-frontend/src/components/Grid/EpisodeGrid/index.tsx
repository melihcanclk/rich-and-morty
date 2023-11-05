import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import Grid from "@/components/Grid";
import { EpisodeModel } from "@/types/EpisodeModel";
import EpisodeCard from "@/components/Cards/EpisodeCard";

const CharacterGrid = () => {
	const { episodes } = useSelector((state: RootState) => state.userSelections);

	return (
		<Grid>
			{episodes?.map((episode: EpisodeModel) => (
				<EpisodeCard key={episode.id} episode={episode} />
			))}
		</Grid>
	);
};

export default CharacterGrid;