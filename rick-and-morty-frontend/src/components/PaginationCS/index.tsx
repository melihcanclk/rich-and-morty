import React from "react";
import Button from "@/components/Button";
import PaginationInput from "@/components/PaginationInput";
import styles from "@/components/PaginationCS/PaginationCS.module.scss";
import { InfoModel } from "@/types";

interface Props {
    input: number;
    setInput: (page: number) => void;
    info: InfoModel;
}

const PaginationCS = (
    { input, setInput, info }: Props
) => {

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
            setInput(e.currentTarget.valueAsNumber);
        }
    };

    const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setInput(Number(e.currentTarget.value));
    };

    const handlePrev = () => {
        if (input === 1) return;
        setInput(input - 1);
    };

    const handleNext = () => {
        setInput(input + 1);
    };

    React.useEffect(() => {
        setInput(input > (info?.pages ?? 1) ? info?.pages ?? 1 : input);

    }, [input, info?.pages]);


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

export default PaginationCS;

