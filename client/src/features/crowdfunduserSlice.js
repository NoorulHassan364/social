import { createSlice } from "@reduxjs/toolkit";
import appApi from "../services/appApi";

export const crowdfunduserSlice = createSlice({
    name: "crowdfunduser",
    initialState: {},
    reducers: {
        setUser : (state, { payload}) => {
            // delete state.crowdfunduser;
          
            state.crowdfunduser = payload;
        }
    },

    extraReducers: (builder) => {
        // save user after signup
       
        
        
    },
});

export const {  setUser } = crowdfunduserSlice.actions;
export default crowdfunduserSlice.reducer;
