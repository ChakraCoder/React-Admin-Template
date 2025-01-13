import axios from "axios";
import { user } from "../types/user";

const UserApiService = axios.create({
    baseURL:
        process.env.NODE_ENV === "development"
            ? "https://apigenerator.dronahq.com/api/ZIOBS35F/"
            : "https://deployed.url/v1/api/user",
});

// Request interceptor to include auth token in specific requests
// UserApiService.interceptors.request.use(
//     (config) => {
//         let authToken = localStorage.getItem("auth_token");

//         if (authToken) {
//             // Check if the request URL requires authorization (e.g., cart-related endpoints)
//             if (config.url.includes("cart") || config.url.includes("review")) {
//                 config.headers["Authorization"] = `Bearer ${authToken}`;
//             }
//         }

//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

export default UserApiService

export const getAllUser = async () => {
    const users = await UserApiService.get(`users`);
    return users.data;
}

export const getUserById = async (id: string) => {
    const users = await UserApiService.get(`users/${id}`);
    return users.data;
}

export const addUser = async (user: user) => {
    const users = await UserApiService.post(`users/`, user);
    return users.data;
}

export const updateUser = async (id: string, user: user) => {
    const users = await UserApiService.patch(`users/${id}`, user);
    return users.data;
}

export const deleteUser = async (id: string) => {
    const users = await UserApiService.delete(`users/${id}`);
    return users.data;
}