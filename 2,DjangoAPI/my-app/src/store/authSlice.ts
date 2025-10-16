import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import type { ILoginResponse } from "../types/users/ILoginResponse";

export interface User {
    id: number;
    username: string;
    email: string;
    image?: string | null;
    date_joined?: string;
}

interface AuthState {
    access: string | null;
    refresh: string | null;
    user: User | null;
}

const getUserFromToken = (token: string): User | null => {
    try {
        const decoded: any = jwtDecode(token);
        return {
            id: decoded.id,
            username: decoded.username,
            email: decoded.email,
            image: decoded.image ?? null,
            date_joined: decoded.date_joined ?? null,
        };
    } catch (error) {
        console.error("Invalid JWT:", error);
        return null;
    }
};

const access = localStorage.getItem("access_token");
const refresh = localStorage.getItem("refresh_token");

const initialState: AuthState = {
    access,
    refresh,
    user: access ? getUserFromToken(access) : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setTokens: (state, action: PayloadAction<ILoginResponse>) => {
            const { access, refresh } = action.payload;
            state.access = access;
            state.refresh = refresh;

            localStorage.setItem("access_token", access);
            localStorage.setItem("refresh_token", refresh);

            state.user = getUserFromToken(access);
        },
        clearTokens: (state) => {
            state.access = null;
            state.refresh = null;
            state.user = null;

            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
        },
        updateAccessToken: (state, action: PayloadAction<string>) => {
            state.access = action.payload;
            localStorage.setItem("access_token", action.payload);
            state.user = getUserFromToken(action.payload);
        },
    },
});

export const { setTokens, clearTokens, updateAccessToken } = authSlice.actions;

export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectAccessToken = (state: { auth: AuthState }) => state.auth.access;
export const selectRefreshToken = (state: { auth: AuthState }) => state.auth.refresh;

export default authSlice.reducer;
