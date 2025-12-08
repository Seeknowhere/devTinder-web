import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice"
import feedReducer from "./feedSlice"
import matchesReducer from "./matchesSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        matches: matchesReducer,
    }
})