import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./usersSlice";
import loaderSlice from "./loaderSlice";

const store=configureStore({
    reducer:{
        userState:userSlice.reducer,
        loaderState:loaderSlice.reducer
    }
})

export default store