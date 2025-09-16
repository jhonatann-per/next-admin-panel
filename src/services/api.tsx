import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
    baseURL: "http://localhost:8080", 
    headers: {
        "Content-Type": "application/json", 
    }
});

instance.interceptors.request.use(
    (config) => {
        if(typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            if(token) {
                config.headers.Authorization = `Bearer ${token}`;
                console.log(`Bearer ${token}`)
            }
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    }
)

export default instance;