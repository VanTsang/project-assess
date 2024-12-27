import { configureStore } from "@reduxjs/toolkit";
import enrollReducer from "./enrollSlice";

//配置 Redux store
export const store = configureStore({
    reducer: {
        enroll: enrollReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch