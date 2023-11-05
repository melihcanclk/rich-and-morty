import React from "react";
import styles from "./Search.module.scss";
import { Close } from "@/assets/icons/Close";

interface Props {
    value?: string;
    placeholder?: string;
    onClickReset: () => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    searchValue: string;
}

const Search = ({
    placeholder,
    onClickReset,
    handleChange,
    searchValue
}: Props) => {

    return (
        <div className={styles.search} >
            <input
                autoComplete="off"
                className={styles.search__input}
                onChange={handleChange}
                placeholder={placeholder}
                type="search"
                value={searchValue}
            />
            {searchValue && (
                <button
                    title="reset"
                    type="reset"
                    onClick={onClickReset}
                    className={styles.search__reset}
                >
                    <Close />
                </button>
            )}
        </div>
    );
};

export default Search;