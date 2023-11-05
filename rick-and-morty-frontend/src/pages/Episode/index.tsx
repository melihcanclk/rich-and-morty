import EpisodeInfo from "@/components/EpisodeInfo";
import { useParams } from "react-router-dom";

const Episode = () => {
    const { id: id } = useParams();

    return (
        <EpisodeInfo
            id={id as string}
        />
    )
}

export default Episode