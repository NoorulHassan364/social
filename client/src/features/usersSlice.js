import { createSlice } from "@reduxjs/toolkit";
import appApi from "../services/appApi";

export const usersSlice = createSlice({
    name: "users",
    initialState: null,
    reducers: {

    },

    extraReducers: (builder) => {
       
        
        builder.addMatcher(appApi.endpoints.getUser.matchFulfilled, (state, { payload }) => payload || []);
    },
});

export default usersSlice.reducer;
