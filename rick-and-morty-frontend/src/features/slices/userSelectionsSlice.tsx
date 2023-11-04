import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { CharacterModel, InfoModel } from "@/types";
import { getLocalStorage } from "@/utils/getLocalStorage";
import { CHARACTER } from "@/utils/getCharacters";

type UserSelectionsState = {
    characters: CharacterModel[],
    character: CharacterModel,
    info: InfoModel,
    error: string,
    loading: boolean,
    modal: boolean,
    lastFocus: string,
    favorites: CharacterModel[],
    filters: Filter,
    search: string,
};

type Filter = {
    page: number;
    search: string;
    status: string;
    species: string;
    gender: string;
};

// init state
const initialStateFilter = {
    page: parseInt(getLocalStorage("page", 1)),
    status: getLocalStorage("status", ""),
    species: getLocalStorage("species", ""),
    gender: getLocalStorage("gender", "")
} as Filter;

const query = new URLSearchParams();
if (initialStateFilter.page) query.set("page", initialStateFilter.page.toString());
if (initialStateFilter.search) query.set("name", initialStateFilter.search);
if (initialStateFilter.status) query.set("status", initialStateFilter.status);
if (initialStateFilter.species) query.set("species", initialStateFilter.species);
const { info, results, error } = await fetch(`${CHARACTER}?${query}`).then(res => res.json()).catch((e) => console.log(`Back to page 1: ${e}`))

const initialModal = getLocalStorage(
    "modal",
    JSON.stringify(false)
)

const initialFavorites = getLocalStorage(
    "favorites",
    []
);

// mark favorites
results.map((c: CharacterModel) => {
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
        if (filters.page) query.set("page", filters.page.toString());
        if (filters.search) query.set("name", filters.search);
        if (filters.status) query.set("status", filters.status);
        if (filters.species) query.set("species", filters.species);
        if (filters.gender) query.set("gender", filters.gender);
        const { info, results, error } = await fetch(`${CHARACTER}?${query}`).then(res => res.json()).catch((e) => console.log(`Back to page 1: ${e}`))
        if (results) {
            // return { info, results, error };
            return { info, results, error };
        } else {
            return { info, results: [], error };
        }
    }
);

// init state
const initialState = {
    characters: results as CharacterModel[],
    info: info as InfoModel,
    error: error as string,
    loading: false,
    character: {} as CharacterModel,
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
        setPage(state, action) {
            state.filters.page = action.payload;
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
            state.filters.page = 1;
            state.filters.gender = "";
            state.filters.species = "";
            state.filters.status = "";
            // set localStorage
            localStorage.setItem("page", "1");
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
            state.info = action.payload.info;
            state.error = action.payload.error;
            state.loading = false;
        });
        builder.addCase(fetchData.rejected, (state, action) => {
            state.error = action.error.message ?? "";
            state.loading = false;
        });
    }
});


export const {
    addFavourite,
    removeFavorite,
    setPage,
    setSearch,
    setStatus,
    setSpecies,
    setGender,
    resetFilters
} = userSelectionsSlice.actions;

export const selectCharacters = (state: RootState) => state.userSelections.characters;
export const selectCharacter = (state: RootState) => state.userSelections.character;
export const selectInfo = (state: RootState) => state.userSelections.info;
export const selectError = (state: RootState) => state.userSelections.error;
export const selectLoading = (state: RootState) => state.userSelections.loading;
export const selectModal = (state: RootState) => state.userSelections.modal;
export const selectLastFocus = (state: RootState) => state.userSelections.lastFocus;
export const selectFavorites = (state: RootState) => state.userSelections.favorites;
export const selectFilters = (state: RootState) => state.userSelections.filters;

export default userSelectionsSlice.reducer;
