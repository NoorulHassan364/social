import { createSlice } from "@reduxjs/toolkit";
import appApi from "../services/appApi";

export const newuserSlice = createSlice({
    name: "NewUser",
    initialState: {},
    reducers: {
        addEmail: (state = {}, { payload }) => {
            // state.newusers[payload] = state.newusers[payload]
            // state = { email: action.email }
            // state = { password : action.password }
            // console.log(payload, "-----");
            state.newuser = payload;
            
        },
        addRole : (state = {},  {payload}  ) =>{
            console.log(payload);
            state.newuser = payload;
                
                 
           
        },
        addCrowdfunding : (state = {}, { payload } ) =>{
            console.log(payload);
            state.newuser = {
                ...state.newuser,
                 payload,
            };
        }
    },
    extraReducers: (builder) => {

    },
});


export const { addEmail, addCrowdfunding ,  addRole } = newuserSlice.actions


export default newuserSlice.reducer;
