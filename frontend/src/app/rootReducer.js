import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "../features/authSlice"
import { authApi } from "@/features/api/authApi"
import { courseApi } from "@/features/api/courseApi";
import { purchaseApi } from "@/features/api/purchaseApi";
import { courseprogressApi } from "@/features/api/courseProgressApi";

const rootReducer = combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [courseApi.reducerPath]:courseApi.reducer,
    [purchaseApi.reducerPath]:purchaseApi.reducer,
    [courseprogressApi.reducerPath]:courseprogressApi.reducer,
    auth:authReducer
});

export default rootReducer;