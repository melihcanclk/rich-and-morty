import CharacterInfo from "@/components/CharacterInfo";
import { useParams } from "react-router-dom";

const Episode = () => {
    const { id: id } = useParams();
    console.log(id);

    return (
        <CharacterInfo
            id={id as string}
        />
    )
}

export default Episode