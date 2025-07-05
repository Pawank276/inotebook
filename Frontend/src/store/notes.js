import { createSlice } from "@reduxjs/toolkit";
const host = "http://localhost:5000";

const notesSlice = createSlice({
    name: "notes",
    initialState: [],
    reducers: {
        getnotes: (state, action) => {
            return action.payload
        },
        addnote: (state, action) => {
            const { title, description, tag } = action.payload;
            fetch(`${host}/api/notes/addnote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag })
            });
        },
        editnote: (state, action) => {
            const { id, title, description, tag } = action.payload;
            fetch(`${host}/api/notes/updatenote/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag })
            });
        },
    }
})

export const noteActions = notesSlice.actions;
export default notesSlice;
