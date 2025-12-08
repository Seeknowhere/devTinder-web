import { createSlice } from "@reduxjs/toolkit";

const matchesSlice = createSlice({
    name: 'matches',
    initialState : null,
    reducers : {
        addMatches: (state, action) => {
            return action.payload
        }
    }
})

export const{ addMatches } = matchesSlice.actions;
export default matchesSlice.reducer;