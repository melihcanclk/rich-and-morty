import { fetchData, setPage } from "@/features/slices/userSelectionsSlice";
import { RootState } from "@/store/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/components/Button";
import PaginationInput from "@/components/Pagination/PaginationInput";
import styles from "./Pagination.module.scss";

const Pagination = () => {
    const filters = useSelector((state: RootState) => state.userSelections.filters);
    const info = useSelector((state: RootState) => state.userSelections.info);
    const dispatch = useDispatch<any>();
    const [input, setInput] = React.useState(filters.page);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) {
            setInput(1);
            return;
        }
        if (Number(e.target.value) > info?.pages) {
            setInput(info?.pages ?? 1);
            return;
        }
        setInput(Number(e.target.value));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            dispatch(setPage(input));
        }
    };

    const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setPage(Number(e.currentTarget.value));
    };

    const handlePrev = () => {
        if (filters.page === 1) return;
        dispatch(setPage(filters.page - 1));
        setInput(filters.page - 1);
    };

    const handleNext = () => {
        dispatch(setPage(filters.page + 1));
        setInput(filters.page + 1);
    };

    React.useEffect(() => {
        setInput(filters.page > (info?.pages ?? 1) ? info?.pages ?? 1 : filters.page);

    }, [filters.page, info?.pages]);

    useEffect(() => {
        dispatch(fetchData(filters))
    }, [dispatch, filters]);

    return (
        <div className={styles.pagination}>
            <Button type="button" onClick={handlePrev} disabled={!info?.prev}>
                Prev
            </Button>
            <span>
                <PaginationInput
                    type="number"
                    value={input}
                    label="Page:"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onBlur={handleOnBlur}
                    max={info?.pages ?? 1}
                    min={1}
                />{" "}
                / {info?.pages ?? 0}
            </span>
            <Button type="button" onClick={handleNext} disabled={!info?.next}>
                Next
            </Button>
        </div>
    );
};

export default Pagination;

