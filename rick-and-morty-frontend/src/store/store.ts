import { configureStore } from "@reduxjs/toolkit";
import userSelectionsReducer from "@/features/slices/userSelectionsSlice";

export const store = configureStore({
  reducer: {
    userSelections: userSelectionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
