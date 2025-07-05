import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
    name: "alert",
    initialState: { message: "", type: "" },
    reducers: {
        showAlert: (state, action) => {
            state.message = action.payload.message;
            state.type = action.payload.type;
        },
        clearAlert: (state) => {
            state.message = '';
            state.type = '';
        }
    }
})

export const alertActions = alertSlice.actions;
export default alertSlice;