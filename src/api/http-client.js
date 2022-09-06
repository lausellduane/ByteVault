import axios from "axios";

export const byteVaultApi = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    timeout: 2000,
    headers: {
        "Content-type": "application/json"
    }
});