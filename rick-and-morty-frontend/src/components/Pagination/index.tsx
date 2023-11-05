import { fetchData } from "@/features/slices/userSelectionsSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Button from "@/components/Button";
import PaginationInput from "@/components/PaginationInput";
import styles from "@/components/Pagination/Pagination.module.scss";
import { InfoModel } from "@/types";

interface Props {
    filters?: any;
    page: number;
    setPage: (page: number) => void;
    info: InfoModel;
}

const Pagination = (
    { filters, page, setPage, info }: Props
) => {
    const dispatch = useDispatch<any>();
    const [input, setInput] = React.useState(page);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value || Number(e.target.value) < 1) {
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
        if (page === 1) return;
        dispatch(setPage(page - 1));
        setInput(page - 1);
    };

    const handleNext = () => {
        dispatch(setPage(page + 1));
        setInput(page + 1);
    };

    React.useEffect(() => {
        setInput(page > (info?.pages ?? 1) ? info?.pages ?? 1 : page);

    }, [page, info?.pages]);

    useEffect(() => {
        dispatch(fetchData(filters as any))
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

