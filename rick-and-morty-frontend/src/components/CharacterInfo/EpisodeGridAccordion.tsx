import styles from "@/components/CharacterInfo/CharacterInfo.module.scss"

export const EpisodeGridAccordion = ({
    episode
}: {
    episode: string;
}) => {
    return (
        <a
            href={`/episode/${episode}`}
            className={styles.gridInner}
        >
            {`Episode ${episode}`}
        </a>
    );
}