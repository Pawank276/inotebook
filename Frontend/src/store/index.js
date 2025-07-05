import { configureStore } from "@reduxjs/toolkit";
import notesSlice from "./notes";
import alertSlice from "./alert";

const noteStore = configureStore({
    reducer: {
        notes: notesSlice.reducer,
        alert: alertSlice.reducer
    }
});

export default noteStore;