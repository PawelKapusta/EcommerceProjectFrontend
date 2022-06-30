import axios from "axios";
const BASE_URL = "https://ecommerceb.azurewebsites.net/api/v1"; // process.env.REACT_APP_BACKEND_UR ||
console.log("BASE_URL", BASE_URL);

export const http = axios.create({
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

export const httpProtected = token =>
  axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
