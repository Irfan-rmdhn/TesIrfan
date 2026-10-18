import axios from "axios";
import { useAuth } from "./useAuth";
import { data } from "react-router-dom";

const formatError = (error) => {
  if (!error) return "Network Error";
  const errors = error.response.data.errors;
  return !errors ? error.response.data.message : Object.values(errors).flat();
};
export function useFetch() {
  const { user } = useAuth();
  const axiosProv = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
      Authorization: "Bearer " + user?.token,
    },
  });
  return {
    post: async (p, v) => {
      try {
        const res = await axiosProv.post(p, v);
        return { status: true, data: res.data };
      } catch (err) {
        return { status: false, message: formatError(err) };
      }
    },
    get: async (p, v) => {
      try {
        const res = await axiosProv.get(p, v);
        return { status: true, data: res.data.data };
      } catch (err) {
        return { status: false, message: formatError(err) };
      }
    },
    update: async (p, v) => {
      try {
        const res = await axiosProv.put(p, v);
        return { status: true, data: res.data };
      } catch (err) {
        return { status: false, message: formatError(err) };
      }
    },
    destroy: async (p, v) => {
      try {
        const res = await axiosProv.delete(p, v);
        return { status: true, data: res.data };
      } catch (err) {
        return { status: false, message: formatError(err) };
      }
    },
  };
}
