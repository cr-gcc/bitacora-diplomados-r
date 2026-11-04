import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,

    headers: {
        Accept: "application/json",
    },

    withCredentials: true,
    withXSRFToken: true,
    timeout: 10000,
});