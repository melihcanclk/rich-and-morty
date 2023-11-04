import styles from "./Controls.module.scss";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import { resetFilters, setGender, setSpecies, setStatus } from "@/features/slices/userSelectionsSlice";
import { useDispatch, useSelector } from "react-redux";
import Search from "@/components/Search";

const Controls = () => {
	
	const filters = useSelector((state: any) => state.userSelections.filters);
	const dispatch = useDispatch();

	

	
	return (
		<section className={styles.controls}>
			<Search
				placeholder="Search a character..."
				loading={false}
			/>
			<Dropdown
				title="Status"
				options={["alive", "dead", "unknown"]}
				setValue={(value: string) => dispatch(setStatus(value))}
				value={filters.status}
			/>
			<Dropdown
				title="Species"
				options={["human", "humanoid", "alien", "unknown"]}
				setValue={(value: string) => dispatch(setSpecies(value))}
				value={filters.species}
			/>
			<Dropdown
				title="Gender"
				options={["female", "male", "genderless", "unknown"]}
				setValue={(value: string) => dispatch(setGender(value))}
				value={filters.gender}
			/>
			<Button
				type="button"
				onClick={() => dispatch(resetFilters())}
				disabled={!filters.species && !filters.status && !filters.gender}
			>
				Reset filters
			</Button>
		</section>
	);
};

export default Controls;