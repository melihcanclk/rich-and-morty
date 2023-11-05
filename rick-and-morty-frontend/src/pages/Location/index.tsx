import LocationInfo from "@/components/LocationInfo";
import { useParams } from "react-router-dom";

const Location = () => {
    const { id: id } = useParams();

    return (
        <LocationInfo
            id={id as string}
        />
    )
}

export default Location