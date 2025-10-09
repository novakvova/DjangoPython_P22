import {createApi} from "@reduxjs/toolkit/query/react";
import {createBaseQuery} from "../utils/createBaseQuery";
import type {IUserItem} from "../types/users/IUserItem";
import type {ILoginResponse} from "../types/users/ILoginResponse.ts";
import {serialize} from "object-to-formdata";
import type {IUserRegister} from "../types/users/IUserRegister.ts";
import type {IResetPasswordRequest} from "../types/users/IResetPasswordRequest.ts";
import type {ILoginRequest} from "../types/users/ILoginRequest.ts";
import type {IResetPasswordConfirm} from "../types/users/IResetPasswordConfirm.ts";

export const userService = createApi({
    reducerPath: 'userService',
    baseQuery: createBaseQuery('users'),
    tagTypes: ['Users'],

    endpoints: (builder) => ({
        getUsers: builder.query<IUserItem[], void>({
            query: () => {
                return {
                    url: '',
                    method: 'GET'
                };
            },
            providesTags: ["Users"]
        }),
        register: builder.mutation<ILoginResponse, IUserRegister>({
            query: (credentials) => {
                const formData = serialize(credentials);

                return {
                    url: 'register/',
                    method: 'POST',
                    body: formData
                };
            },
            invalidatesTags: ["Users"]
        }),
        resetPasswordRequest: builder.mutation<void, IResetPasswordRequest>({
            query: (credentials) => {
                const formData = serialize(credentials);

                return {
                    url: 'password-reset-request/',
                    method: 'POST',
                    body: formData,
                }
            }
        }),
        resetPassword: builder.mutation<void, IResetPasswordConfirm>({
            query: (credentials) => {
                const formData = serialize(credentials);

                return {
                    url: 'password-reset-confirm/',
                    method: 'POST',
                    body: formData,
                }
            }
        }),
        login: builder.mutation<ILoginResponse, ILoginRequest>({
            query: (credentials) => {
                const formData = serialize(credentials);

                return {
                    url: 'login/',
                    method: 'POST',
                    body: formData,
                }
            }
        })
    }),
});

export const {
    useGetUsersQuery,
    useRegisterMutation,
    useLoginMutation,
    useResetPasswordRequestMutation,
    useResetPasswordMutation,
} = userService;