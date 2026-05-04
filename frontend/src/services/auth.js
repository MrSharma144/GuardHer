import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/user` 
  : "http://localhost:8000/api/user";

const API = axios.create({
  baseURL,
  // optionally set timeout, headers here
});

export const registerUser = (payload) => API.post("/register/", payload);
export const loginUser = (payload) => API.post("/login/", payload);

export const setAuthToken = (token) => {
  if (token) API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete API.defaults.headers.common["Authorization"];
};

export default API;