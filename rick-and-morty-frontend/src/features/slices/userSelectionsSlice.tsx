import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { CharacterModel, InfoModel } from "@/types";
import { getLocalStorage } from "@/utils/getLocalStorage";
import { CHARACTER, EPISODE } from "@/utils/getCharacters";
import { EpisodeModel } from "@/types/EpisodeModel";

type UserSelectionsState = {
    characters: CharacterModel[],
    episodes: EpisodeModel[],
    info_characters: InfoModel,
    info_episodes: InfoModel,
    error: string,
    loading: boolean,
    modal: boolean,
    lastFocus: string,
    favorites: CharacterModel[],
    filters: Filter,
    search: string,
};

type Filter = {
    page_characters: number;
    page_episodes: number;
    search: string;
    status: string;
    species: string;
    gender: string;
};

// init state
const initialStateFilter = {
    page_characters: Number(getLocalStorage("page_characters", "1")),
    page_episodes: Number(getLocalStorage("page_episodes", "1")),
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
const initialModal = getLocalStorage(
    "modal",
    JSON.stringify(false)
)

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

        return { info_characters, results, info_episodes, episodes, error };
    }
);

// init state
const initialState = {
    characters: characters as CharacterModel[],
    episodes: episodes as EpisodeModel[],
    info_characters: info_characters as InfoModel,
    info_episodes: info_episodes as InfoModel,
    error: error as string,
    loading: false,
    modal: initialModal as boolean,
    favorites: initialFavorites as CharacterModel[],
    filters: initialStateFilter,
    search: "" as string
} as UserSelectionsState;

const userSelectionsSlice = createSlice({
    name: "userSelections",
    initialState,
    reducers: {
        addFavourite(state: UserSelectionsState, action: PayloadAction<CharacterModel>) {
            state.favorites.push(action.payload);
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
            state.characters = state.characters.map((c: CharacterModel) => {
                if (c.id === action.payload.id) {
                    c.isFavorite = false;
                }
                return c;
            });
            localStorage.setItem("favorites", JSON.stringify(state.favorites));
        },
        setPageCharacters(state, action) {
            state.filters.page_characters = action.payload;
            localStorage.setItem("page", action.payload);
        },
        setPageEpisodes(state, action) {
            state.filters.page_episodes = action.payload;
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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.characters = action.payload.results;
            // mark favorites
            state.characters.map((c: CharacterModel) => {
                if (state.favorites.some((f: CharacterModel) => f.id === c.id)) {
                    c.isFavorite = true;
                } else {
                    c.isFavorite = false;
                }
                return c;
            });

            state.episodes = action.payload.episodes;
            state.info_characters = action.payload.info_characters;
            state.info_episodes = action.payload.info_episodes;
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
    setPageCharacters,
    setPageEpisodes,
    setSearch,
    setStatus,
    setSpecies,
    setGender,
    resetFilters
} = userSelectionsSlice.actions;

export const selectCharacters = (state: RootState) => state.userSelections.characters;
export const selectEpisodes = (state: RootState) => state.userSelections.episodes;
export const selectInfoCharacters = (state: RootState) => state.userSelections.info_characters;
export const selectInfoEpisodes = (state: RootState) => state.userSelections.info_episodes;
export const selectError = (state: RootState) => state.userSelections.error;
export const selectLoading = (state: RootState) => state.userSelections.loading;
export const selectModal = (state: RootState) => state.userSelections.modal;
export const selectLastFocus = (state: RootState) => state.userSelections.lastFocus;
export const selectFavorites = (state: RootState) => state.userSelections.favorites;
export const selectFilters = (state: RootState) => state.userSelections.filters;

export default userSelectionsSlice.reducer;
