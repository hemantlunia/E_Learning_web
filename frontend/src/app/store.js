import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "@/features/api/authApi";
import { courseApi } from "@/features/api/courseApi";
import { purchaseApi } from "@/features/api/purchaseApi";
import { courseprogressApi } from "@/features/api/courseProgressApi";

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (defaultmiddleware) =>
    defaultmiddleware().concat(authApi.middleware,courseApi.middleware,purchaseApi.middleware,courseprogressApi.middleware),
});

const initializeApp = async()=>{
      await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
}

initializeApp();