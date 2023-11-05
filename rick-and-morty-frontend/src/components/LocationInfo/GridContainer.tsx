import styles from "@/components/LocationInfo/LocationInfo.module.scss"

export const GridContainer = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className={styles.gridContainer}>
            {children}
        </div>
    );
}