import React from "react";
import styles from "./Controls.module.scss";
import Button from "@/components/Button";
import { UserContext } from "@/context";
import { FiltersContext } from "@/context";
import Dropdown from "@/components/Dropdown";
import { CharacterSearchModel } from "@/types";

const Controls = () => {
	const {
		suggestions,
		suggestionsError,
		suggestionsLoading,
		setSuggestionsLoading,
		handleGetSuggestions,
		newSearch,
		setNewSearch,
	} = React.useContext(UserContext);
	const { status, search, species, gender, setSearch, setStatus, setSpecies, setGender, resetFilters } =
		React.useContext(FiltersContext);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewSearch(e.target.value);
	};

	const handleSearch = (name: string) => {
		setSearch(name);
		setNewSearch(name);
	};

	React.useEffect(() => {
		if (suggestions.some((s: CharacterSearchModel) => s.name === newSearch)) {
			return;
		}

		setSuggestionsLoading(true);

		const timeoutId = setTimeout(() => {
			handleGetSuggestions();
		}, 500);

		return () => clearTimeout(timeoutId);
	}, [newSearch]); // eslint-disable-line react-hooks/exhaustive-deps

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
				title="Status..."
				options={["alive", "dead", "unknown"]}
				setValue={setStatus}
				value={status}
			/>
			<Dropdown
				title="Species..."
				options={["human", "humanoid", "alien", "unknown"]}
				setValue={setSpecies}
				value={species}
			/>
			<Dropdown
				title="Gender..."
				options={["female", "male", "genderless", "unknown"]}
				setValue={setGender}
				value={gender}
			/>
			<Button
				type="button"
				onClick={resetFilters}
				disabled={!status && !search && !species && !gender}
			>
				Reset filters
			</Button>
		</section>
	);
};

export default Controls;