import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://creamsoda.in/a/dream"
      : "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export { axiosInstance as axios };
