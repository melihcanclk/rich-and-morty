import * as React from "react";
import styles from "./Header.module.scss";
import Button from "../Button";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineCloseSquare } from "react-icons/ai";

const Header = () => {
    const [menuOpen, setMenuOpen] = React.useState(false);
    const menuToggler = () => setMenuOpen((p) => !p);
    return (
        <div className={styles.header}>
            <div className={styles.header__content}>
                <div>
                    <span className={styles.logo}>R&M App</span>
                </div>
                <div>
                    <nav className={`${styles.nav} ${menuOpen ? styles[`nav--open`] : {}}`}>
                        <a className={styles.nav__item} href={"/all-characters"}>
                            All Characters
                        </a>
                        <a className={styles.nav__item} href={"/"}>
                            Page Two
                        </a>
                        <a className={styles.nav__item} href={"/"}>
                            Page Three
                        </a>
                        <div className={styles.nav__button__container}>
                            <Button
                                onClick={() => {
                                    console.log("Contact");
                                }}
                            >
                                Contact
                            </Button>
                        </div>
                    </nav>
                </div>
                <div>
                    <div className={styles.header__button__container}>
                        <Button
                            onClick={() => {
                                console.log("Contact");
                            }}
                        >
                            Contact
                        </Button>
                    </div>
                    <button className={styles.header__toggler} onClick={menuToggler}>
                        {!menuOpen ? <BiMenuAltRight /> : <AiOutlineCloseSquare />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export { Header };