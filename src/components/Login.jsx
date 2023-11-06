import React from "react";
import { Link, json, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Navbar from "./Navbar/Navbar";
import axios from "axios";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const notify = (a) => toast.success(` ${a} `);

  const onSubmit = (data) => {
    // console.log(data.email, data.password);
    // console.log(errors);
    const action = async (a, b) => {
      try {
        await login(a, b);
        await loginUser({ email: a, password: b });
        notify("Login Succesfully!!");
      } catch (error) { 
        const a = JSON.stringify(error);
        // console.log(a);
        // console.log(JSON.parse(a).code);
        const errorMessage = JSON.parse(a).code;
        notify("Login Fail!!");

        if (errorMessage === "auth/wrong-password") {
          setError("password", {
            type: "manual",
            message: errorMessage,
          });
        } else {
          setError("email", {
            type: "manual",
            message: errorMessage,
          });
        }
        console.log(error);
        console.error("Login failed", error.message);
      }
    };
    action(data.email, data.password);
  };

  const loginUser = async (userData) => {
    console.log(userData);
    // Define the API URL
    const API_URL =
      "https://task-management-server-ebpb.vercel.app/auth/login";
    // Send a POST request with the data
    axios
      .post(API_URL, userData, { withCredentials: true })
      .then((response) => {
        console.log("User Register successful:", response.data);
        // setUserId(response.data);

        notify("Register Successrul!! ");
        if (response.data.success) {
          // console.log(location.state)
          navigate(location?.state ? location?.state : "/");
        }

      })
      .catch((error) => {
        console.error("Error sending POST request:", error);
      });
  };

  return (
    <div className="w-5/12 m-auto bg-gray-950 rounded mt-32 p-5">
      <Navbar />
      <h1 className=" dark:text-white text-center">Login Form </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            {...register("email", { required: true })}
            autoComplete="on"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">{errors.email.message}</span>
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("password", { required: true, minLength: 6 })}
            autoComplete="on"
          />
          {errors.password && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">
                {errors.password.message
                  ? errors.password.message
                  : errors.password.type === "required"
                  ? "Password is required"
                  : "Password must be at least 6 characters"}
                {/* {console.log(errors.email.message)} */}
              </span>
            </p>
          )}
        </div>
        <div className="flex items-start mb-6 text-white">
          Don't have account??
          <Link to={"/signup"} state={location?.state}>
            <p className="ms-2 text-blue-600 cursor-pointer">Sign up</p>
          </Link>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
