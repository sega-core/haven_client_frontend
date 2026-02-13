import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const setHeader = (header: string, value: string) => {
  instance.defaults.headers[header] = value;
};

export const axiosClient = instance;
