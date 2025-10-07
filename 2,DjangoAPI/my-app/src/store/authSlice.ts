import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {ILoginResponse} from "../types/users/ILoginResponse.ts";

interface AuthState {
    access: string | null;
    refresh: string | null;
}

const initialState: AuthState = {
    access: localStorage.getItem("access_token") || null,
    refresh: localStorage.getItem("refresh_token") || null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setTokens: (state, action: PayloadAction<ILoginResponse>) => {
            state.access = action.payload.access;
            state.refresh = action.payload.refresh;

            localStorage.setItem("access_token", action.payload.access);
            localStorage.setItem("refresh_token", action.payload.refresh);
        },
        clearTokens: (state) => {
            state.access = null;
            state.refresh = null;
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
        },
    },
});

export const { setTokens, clearTokens } = authSlice.actions;
export default authSlice.reducer;