import axios from "axios";
import React from "react";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const instance = axios.create({ baseURL: "http://localhost:3000" });
const useAxiosSecure = () => {
  const { user, Logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const reqInterceptor = instance.interceptors.request.use((config) => {
      const token = user?.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    const resInterceptor = instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const statusCode = error.status;
        if (statusCode === 401 || statusCode === 403) {
          Logout().then(() => {
            navigate("/login");
          });
        }
      },
    );

    return () => {
      instance.interceptors.request.eject(reqInterceptor);
      instance.interceptors.response.eject(resInterceptor);
    };
  }, [user]);

  return instance;
};

export default useAxiosSecure;
