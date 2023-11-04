import React from "react";
import styles from "./Search.module.scss";
import { Close } from "@/assets/icons/Close";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "@/features/slices/userSelectionsSlice";

interface Props {
    value?: string;
    placeholder?: string;
    loading: boolean;
}

const Search = ({
    placeholder,
}: Props) => {
    const [display, setDisplay] = React.useState(false);

    const dispatch = useDispatch();
    const filters = useSelector((state: any) => state.userSelections.filters);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!display) setDisplay(true);
        dispatch(setSearch(e.target.value));
    };

    return (
        <div className={styles.search} >
            <input
                autoComplete="off"
                className={styles.search__input}
                onChange={handleChange}
                placeholder={placeholder}
                type="search"
                value={filters.search}
            />
            {filters.search && (
                <button
                    title="reset"
                    type="reset"
                    onClick={() => dispatch(setSearch(""))}
                    className={styles.search__reset}
                >
                    <Close />
                </button>
            )}
        </div>
    );
};

export default Search;