import { configureStore } from "@reduxjs/toolkit";
import userSelectionsReducer from "@/features/slices/userSelectionsSlice";
// importing the reducer from todo slice

// use 'configreStrore'  function to create the store
export const store = configureStore({
  reducer: {
    userSelections: userSelectionsReducer,
  },
});


// defining the 'rootstate' as the return type
export type RootState = ReturnType<typeof store.getState>;
