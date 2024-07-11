import { configureStore } from "@reduxjs/toolkit";
import allData from "../slice/getDataSlice";

export const store = configureStore({
    reducer: {
        todoDAta: allData
    }
});
