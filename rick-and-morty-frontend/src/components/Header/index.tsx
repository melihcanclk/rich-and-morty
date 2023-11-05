import * as React from "react";
import styles from "./Header.module.scss";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { useSelector } from "react-redux";

const Header = () => {
    const [menuOpen, setMenuOpen] = React.useState(false);
    const menuToggler = () => setMenuOpen((p) => !p);
    const favoriteCount = useSelector((state: any) => state.userSelections.favoriteCount);
    return (
        <div className={styles.header}>
            <div className={styles.header__content}>
                
                <div>
                    <nav className={`${styles.nav} ${menuOpen ? styles[`nav--open`] : {}}`}>
                        <a className={styles.nav__item} href={"/characters"}>
                            Characters
                        </a>
                        <a className={styles.nav__item} href={"/episodes"}>
                            Episodes
                        </a>
                        <a className={styles.nav__item} href={"/locations"}>
                            Locations
                        </a>
                        <a className={styles.nav__item} href={"/favorites"}>
                            Favorites ({favoriteCount})
                        </a>
                        {/* <div className={styles.nav__button__container}>
                            <Button
                                onClick={() => {
                                    console.log("Contact");
                                }}
                            >
                                Contact
                            </Button>
                        </div> */}
                    </nav>
                </div>
                <div>
                    {/* <div className={styles.header__button__container}>
                        <Button
                            onClick={() => {
                                console.log("Contact");
                            }}
                        >
                            Contact
                        </Button>
                    </div> */}
                    <button className={styles.header__toggler} onClick={menuToggler}>
                        {!menuOpen ? <BiMenuAltRight /> : <AiOutlineCloseSquare />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export { Header };