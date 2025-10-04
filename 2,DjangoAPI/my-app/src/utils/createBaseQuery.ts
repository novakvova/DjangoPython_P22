import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import {APP_ENV} from "../env";

export const createBaseQuery = (endpoint: string) =>
    fetchBaseQuery({
        baseUrl: `${APP_ENV.API_BASE_URL}/api/${endpoint}/`,
    });