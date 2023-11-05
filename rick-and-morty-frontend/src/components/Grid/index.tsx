import styles from "./Grid.module.scss";

const Grid = ({ children }: { children: React.ReactNode }) => {

    return (
        <section className={styles.grid} >
            {children}
        </section>
    );
};

export default Grid;