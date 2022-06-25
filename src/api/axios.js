import axios from "axios";
const BASE_URL = "http://localhost:8080/api/v1"; // process.env.REACT_APP_BACKEND_UR ||
console.log("BASE_URL", BASE_URL);
const http = axios.create({
  baseURL: BASE_URL, // Now it's local url
  headers: {
    "Content-Type": "application/json",
  },
  transformRequest: [
    data => {
      return JSON.stringify(data);
    },
  ],
  transformResponse: [
    data => {
      return JSON.parse(data);
    },
  ],
});

const httpProtected = (token) => axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    'Authorization': `Basic ${token}`,
  },
  transformRequest: [
    data => {
      return JSON.stringify(data);
    },
  ],
  transformResponse: [
    data => {
      return JSON.parse(data);
    },
  ],
});

export default {
  http,
  httpProtected
};
