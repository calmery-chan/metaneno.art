import axios from "axios";

export default axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://metaneno.herokuapp.com/"
      : "http://localhost:5000/",
  headers: {
    Accept: "application/json",
  },
  withCredentials: true,
});
