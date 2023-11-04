import React from "react";
import styles from "./Search.module.scss";
import { Close } from "@/assets/icons/Close";
import { SearchIcon } from "@/assets/icons/SearchIcon";
import { Loader } from "@/assets/icons/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "@/features/slices/userSelectionsSlice";

interface Props {
    value?: string;
    placeholder?: string;
    loading: boolean;
    onSearch: (name: string) => void;
}

const Search = ({
    placeholder,
    loading,
    onSearch,
}: Props) => {
    const [display, setDisplay] = React.useState(false);
    const wrapperRef = React.useRef<HTMLDivElement>(null);

    const dispatch = useDispatch();
    const filters = useSelector((state: any) => state.userSelections.filters);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!display) setDisplay(true);
        dispatch(setSearch(e.target.value));
    };

    const handleOnSearch = (name: string) => {
        setDisplay(false);
        onSearch(name);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleOnSearch(filters.search);
    };

    const onBlurItems = (e: React.FocusEvent<HTMLDivElement>) => {
        const { current: wrap } = wrapperRef;
        if (wrap && !wrap.contains(e.relatedTarget as Node)) {
            setDisplay(false);
        }
    };
    // TODO: search implementation
    // - when search button is clicked, call handleSearch function and make the API call
    // - reset search after search button is clicked
    // - fix double search when enter is pressed

    // TODO: pagination implementation
    console.log(filters.search)
    return (
        <form className={styles.search} onSubmit={onSubmit}>
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
            <button
                disabled={
                    filters.search === undefined
                }
                title="search" type="submit" tabIndex={0} className={styles.search__button}>
                <SearchIcon />
            </button>
            {display && (
                <div ref={wrapperRef} className={styles.suggestions} onBlur={onBlurItems}>
                    {loading && (
                        <Loader />
                    )}
                </div>
            )}
        </form>
    );
};

export default Search;