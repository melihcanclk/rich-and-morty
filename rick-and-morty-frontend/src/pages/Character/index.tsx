import CharacterInfo from "@/components/CharacterInfo";
import { useParams } from "react-router-dom";

const Character = () => {
    const { id: id } = useParams();

    return (
        <CharacterInfo
            id={id as string}
        />
    )
}

export default Character