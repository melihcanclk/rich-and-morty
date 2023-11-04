import styles from "./Controls.module.scss";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import { resetFilters, setGender, setSpecies, setStatus } from "@/features/slices/userSelectionsSlice";
import { useDispatch, useSelector } from "react-redux";

const Controls = () => {
	// const {
	// 	suggestions,
	// 	suggestionsError,
	// 	suggestionsLoading,
	// 	setSuggestionsLoading,
	// 	handleGetSuggestions,
	// 	newSearch,
	// 	setNewSearch,
	// } = React.useContext(UserContext);
	// const { status, search, species, gender, setSearch, setStatus, setSpecies, setGender, resetFilters } =
	// 	React.useContext(FiltersContext);

	const dispatch = useDispatch();
	const filters = useSelector((state: any) => state.userSelections.filters);
	console.log({ filters });


	// const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	setNewSearch(e.target.value);
	// };

	// const handleSearch = (name: string) => {
	// 	setSearch(name);
	// 	setNewSearch(name);
	// };

	// React.useEffect(() => {
	// 	if (suggestions.some((s: CharacterSearchModel) => s.name === newSearch)) {
	// 		return;
	// 	}

	// 	setSuggestionsLoading(true);

	// 	const timeoutId = setTimeout(() => {
	// 		handleGetSuggestions();
	// 	}, 500);

	// 	return () => clearTimeout(timeoutId);
	// }, [newSearch]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<section className={styles.controls}>
			{/* <Search
				suggestions={suggestions}
				placeholder="Search a character..."
				value={newSearch}
				loading={suggestionsLoading}
				error={suggestionsError}
				onChange={handleSearchChange}
				onSearch={handleSearch}
			/> */}
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
				disabled={!filters.species && !filters.search && !filters.status && !filters.gender}
			>
				Reset filters
			</Button>
		</section>
	);
};

export default Controls;