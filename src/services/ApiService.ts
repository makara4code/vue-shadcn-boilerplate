import axios from "axios";

const basePath  = import.meta.env.VITE_APP_BASE_PATH;

const api = axios.create({
    baseURL: basePath ? basePath + "/" : "/",
    timeout: 10 * 60 * 1000,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    }
})

export default api;