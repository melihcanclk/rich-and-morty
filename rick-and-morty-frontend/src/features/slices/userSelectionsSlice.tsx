import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CharacterModel, InfoModel } from "@/types";
import { getLocalStorage } from "@/utils/getLocalStorage";
import { CHARACTER, EPISODE, LOCATION } from "@/utils/getCharacters";
import { EpisodeModel } from "@/types/EpisodeModel";
import { LocationModel } from "@/types/LocationModel";

type UserSelectionsState = {
    characters: CharacterModel[],
    characterToBeRemoved: CharacterModel | null,
    episodes: EpisodeModel[],
    locations: LocationModel[],
    info_characters: InfoModel,
    info_episodes: InfoModel,
    info_locations: InfoModel,
    error: string,
    loading: boolean,
    modalRemove: boolean,
    modalError: boolean,
    lastFocus: string,
    favorites: CharacterModel[],
    favoriteCount: number,
    filters: Filter,
    search: string,
};

type Filter = {
    page_characters: number;
    page_episodes: number;
    page_locations: number;
    search: string;
    status: string;
    species: string;
    gender: string;
};

// init state
const initialStateFilter = {
    page_characters: Number(getLocalStorage("page_characters", "1")),
    page_episodes: Number(getLocalStorage("page_episodes", "1")),
    page_locations: Number(getLocalStorage("page_locations", "1")),
    status: getLocalStorage("status", ""),
    species: getLocalStorage("species", ""),
    gender: getLocalStorage("gender", "")
} as Filter;

const query = new URLSearchParams();
if (initialStateFilter.page_characters) query.set("page", initialStateFilter.page_characters.toString());
if (initialStateFilter.search) query.set("name", initialStateFilter.search);
if (initialStateFilter.status) query.set("status", initialStateFilter.status);
if (initialStateFilter.species) query.set("species", initialStateFilter.species);
const { info: info_characters, results: characters, error } = await fetch(`${CHARACTER}?${query}`).then(res => res.json()).catch((e) => console.log(`Back to page 1: ${e}`))

if (initialStateFilter.page_episodes) query.set("page", initialStateFilter.page_episodes.toString());
const { info: info_episodes, results: episodes } = await fetch(`${EPISODE}?${query}`).then(res => res.json()).catch((e) => console.log(`Back to page 1: ${e}`))

if (initialStateFilter.page_locations) query.set("page", initialStateFilter.page_locations.toString());
const { info: info_locations, results: locations } = await fetch(`${LOCATION}?${query}`).then(res => res.json()).catch((e) => console.log(`Back to page 1: ${e}`))

const initialFavorites = getLocalStorage(
    "favorites",
    []
);

// mark favorites
characters.map((c: CharacterModel) => {
    if (initialFavorites.some((f: CharacterModel) => f.id === c.id)) {
        c.isFavorite = true;
    } else {
        c.isFavorite = false;
    }
    return c;
});

export const fetchData = createAsyncThunk(
    "userSelections/fetchData",
    async (filters: Filter) => {
        const query = new URLSearchParams();
        if (filters.page_characters) query.set("page", filters.page_characters.toString());
        if (filters.search) query.set("name", filters.search);
        if (filters.status) query.set("status", filters.status);
        if (filters.species) query.set("species", filters.species);
        if (filters.gender) query.set("gender", filters.gender);
        const { info: info_characters, results, error } = await fetch(`${CHARACTER}?${query}`).then(res => res.json()).catch((e) => console.log(`Back to page 1: ${e}`))

        const query2 = new URLSearchParams();
        if (filters.page_episodes) query2.set("page", filters.page_episodes.toString());
        const { info: info_episodes, results: episodes } = await fetch(`${EPISODE}?${query2}`).then(res => res.json()).catch((e) => console.log(`Back to page 1: ${e}`))


        const query3 = new URLSearchParams();
        if (filters.page_locations) query3.set("page", filters.page_locations.toString());
        const { info: info_locations, results: locations } = await fetch(`${LOCATION}?${query3}`).then(res => res.json()).catch((e) => console.log(`Back to page 1: ${e}`))

        return {
            info_characters,
            info_episodes,
            info_locations,
            results,
            episodes,
            locations,
            error
        };

    }
);

// init state
const initialState = {
    characters: characters as CharacterModel[],
    characterToBeRemoved: null as CharacterModel | null,
    episodes: episodes as EpisodeModel[],
    locations: locations as LocationModel[],
    info_characters: info_characters as InfoModel,
    info_episodes: info_episodes as InfoModel,
    info_locations: info_locations as InfoModel,
    error: error as string,
    loading: false,
    modalRemove: false as boolean,
    modalError: false as boolean,
    favorites: initialFavorites as CharacterModel[],
    favoriteCount: initialFavorites.length as number,
    filters: initialStateFilter,
    search: "" as string
} as UserSelectionsState;

const userSelectionsSlice = createSlice({
    name: "userSelections",
    initialState,
    reducers: {
        addFavourite(state: UserSelectionsState, action: PayloadAction<CharacterModel>) {
            state.favorites.push({
                ...action.payload,
                isFavorite: true
            });
            state.favoriteCount = state.favorites.length;
            localStorage.setItem("favoriteCount", state.favoriteCount.toString());

            state.characters.map((c: CharacterModel) => {
                if (c.id === action.payload.id) {
                    c.isFavorite = true;
                }
                return c;
            });

            localStorage.setItem("favorites", JSON.stringify(state.favorites));
        },
        removeFavorite(state, action) {
            state.favorites = state.favorites.filter((c: CharacterModel) => c.id !== action.payload.id);
            state.favoriteCount = state.favorites.length;
            localStorage.setItem("favoriteCount", state.favoriteCount.toString());
            state.characters = state.characters.map((c: CharacterModel) => {
                if (c.id === action.payload.id) {
                    c.isFavorite = false;
                }
                return c;
            });
            localStorage.setItem("favorites", JSON.stringify(state.favorites));
        },
        setCharacters(state, action) {
            state.characters = action.payload;
            // mark favorites
            state.characters.map((c: CharacterModel) => {
                if (state.favorites.some((f: CharacterModel) => f.id === c.id)) {
                    c.isFavorite = true;
                } else {
                    c.isFavorite = false;
                }
                return c;
            });

        },
        setPageCharacters(state, action) {
            state.filters.page_characters = action.payload;
            localStorage.setItem("page", action.payload);
        },
        setPageEpisodes(state, action) {
            state.filters.page_episodes = action.payload;
            localStorage.setItem("page", action.payload);
        },
        setPageLocations(state, action) {
            state.filters.page_locations = action.payload;
            localStorage.setItem("page", action.payload);
        },
        setSearch(state, action) {
            state.filters.search = action.payload;
        },
        setStatus(state, action) {
            state.filters.status = action.payload;
            localStorage.setItem("status", action.payload);
        },
        setSpecies(state, action) {
            state.filters.species = action.payload;
            localStorage.setItem("species", action.payload);
        },
        setGender(state, action) {
            state.filters.gender = action.payload;
            localStorage.setItem("gender", action.payload)
        },
        resetFilters(state) {
            state.filters.page_characters = 1;
            state.filters.page_episodes = 1;
            state.filters.gender = "";
            state.filters.species = "";
            state.filters.status = "";
            // set localStorage
            localStorage.setItem("page_characters", "1");
            localStorage.setItem("page_episodes", "1");
            localStorage.setItem("status", "");
            localStorage.setItem("species", "");
            localStorage.setItem("gender", "");
        },
        openModalRemove(state, action) {
            state.modalRemove = true;
            state.characterToBeRemoved = action.payload;
            localStorage.setItem("modal", JSON.stringify(true));
        },
        closeModalRemove(state) {
            state.modalRemove = false;
            state.characterToBeRemoved = null;
            localStorage.setItem("modal", JSON.stringify(false));
        },
        openModalError(state, action) {
            state.modalError = true;
            state.characterToBeRemoved = action.payload;
            localStorage.setItem("modalError", JSON.stringify(true));
        },
        closeModalError(state) {
            state.modalError = false;
            localStorage.setItem("modalError", JSON.stringify(false));
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.characters = action.payload.results;
            // mark favorites
            state.characters?.map((c: CharacterModel) => {
                if (state.favorites.some((f: CharacterModel) => f.id === c.id)) {
                    c.isFavorite = true;
                } else {
                    c.isFavorite = false;
                }
                return c;
            });

            state.episodes = action.payload.episodes;
            state.locations = action.payload.locations;
            state.info_characters = action.payload.info_characters;
            state.info_episodes = action.payload.info_episodes;
            state.info_locations = action.payload.info_locations;
            state.error = action.payload.error;
            state.loading = false;

        });
        builder.addCase(fetchData.rejected, (state, action) => {
            state.error = action.error.message ?? "";
            state.loading = false;
        });
    },
});


export const {
    addFavourite,
    removeFavorite,
    setCharacters,
    setPageCharacters,
    setPageEpisodes,
    setPageLocations,
    setSearch,
    setStatus,
    setSpecies,
    setGender,
    resetFilters,
    openModalRemove,
    closeModalRemove,
    openModalError,
    closeModalError,
} = userSelectionsSlice.actions;

export default userSelectionsSlice.reducer;
