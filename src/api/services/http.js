import axios from "axios";

export const http = axios.create({
    baseURL: "https://dog.ceo/api",
    timeout: "2000"
})