import axios from "axios";

export default axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://creamsoda.in/a/dream/"
      : "http://localhost:5000/a/dream/",
  headers: {
    Accept: "application/json",
  },
  withCredentials: true,
});
