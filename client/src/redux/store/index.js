import { configureStore } from "@reduxjs/toolkit";
import  saveOrderSlice  from "../slices/saveOrderSlice";

export default configureStore({
    reducer: {
        saveOrder: saveOrderSlice,
    }
})