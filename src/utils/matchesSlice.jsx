import { createSlice } from "@reduxjs/toolkit";

const matchesSlice = createSlice({
    name: 'matches',
    initialState : [],
    reducers : {
        addMatches: (state, action) => {
            return action.payload
        },
        addSingleMatch: (state, action) => {
            state.push(action.payload)
        },
        removeMatches: (state,action) => {
            return [];
        }
    }
})

export const{ addMatches, addSingleMatch, removeMatches } = matchesSlice.actions;
export default matchesSlice.reducer;