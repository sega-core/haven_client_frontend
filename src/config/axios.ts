import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
});

export const setHeader = (header: string, value: string) => {
  instance.defaults.headers[header] = value;
};

export const axiosClient = instance;
