import {configureStore} from "@reduxjs/toolkit";
import {type TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {userService} from "../services/userService";

export const store = configureStore({
    reducer: {
        [userService.reducerPath]: userService.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(userService.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;