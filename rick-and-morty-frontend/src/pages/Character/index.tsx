import CharacterInfo from "@/components/CharacterInfo";
import styles from "@/styles/Home.module.scss";
import { useParams } from "react-router-dom";

const Episode = () => {
    const { id: id } = useParams();
    console.log(id);

    return (
        <main>
            <div className={styles.main}>
                <CharacterInfo
                    id={id as string}
                />
            </div>
        </main>
    )
}

export default Episode