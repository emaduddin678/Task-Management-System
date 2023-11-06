import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import Navbar from "./Navbar/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import avatar from "../assets/profile.png";
import convertToBase64 from "../helper/covert";

const Signup = () => {
  const [file, setFile] = useState();
  const notify = (a) => toast.success(`Task ${a} Successfully!`);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  if (file) {
    localStorage.setItem("profilePicture", file);
  }

  const hasUppercase = (password) => {
    const uppercasePattern = /[A-Z]/;

    return uppercasePattern.test(password);
  };
  const onSubmit = (data) => {
    // console.log(data.email, data.password, data.username);
    const action = async (a, b, c) => {
      try {
        // console.log("Hello world");
        if (hasUppercase(b)) {
          await signup(a, b, c);
          await registerUser({ username: c, email: a, password: b });
          console.log("Password contains at least one uppercase letter");
        } else {
          setError("password", {
            type: "manual",
            message: "Password does not contain an uppercase letter",
          });
          // console.log("Password does not contain an uppercase letter");
        }


        if (file) {
          localStorage.setItem("profilePicture", file);
        }

        
        // /auth/register
      } catch (error) {
        const a = JSON.stringify(error);
        // console.log(a);
        // console.log(JSON.parse(a).code);
        const errorMessage = JSON.parse(a).code;
        notify("Login Fail!!");
        console.log(errorMessage);
        if (errorMessage === "auth/invalid-email") {
          setError("email", {
            type: "manual",
            message: errorMessage,
          });
        }
        console.error("Login failed", errorMessage);
      }
    };
    action(data.email, data.password, data.username);
  };

  const registerUser = async (userData) => {
    console.log(userData);
    // Define the API URL
    const API_URL = "http://localhost:8800/auth/register";
    // Send a POST request with the data
    axios
      .post(API_URL, userData, { withCredentials: true })
      .then((response) => {
        console.log("User Register successful:", response.data);

        if (response.data.success) {
          navigate(location?.state ? location?.state : "/");
        }

        notify("Register Successrul!! ");
      })
      .catch((error) => {
        console.error("Error sending POST request:", error);
      });
  };

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <div className="w-5/12 m-auto bg-gray-950 rounded mt-32 p-5">
      <Navbar />
      <h1 className=" dark:text-white text-center">Sign Up Form </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="profile flex justify-center py-4">
          <label htmlFor="profile">
            <img
              className="w-1/3 mx-auto rounded-[50%]"
              src={file || avatar}
              alt="avatar"
            />
          </label>

          <input onChange={onUpload} type="file" id="profile" name="profile" />
        </div>
        <div className="mb-6">
          <label
            htmlFor="username-success"
            className="block mb-2 text-sm font-medium text-white"
          >
            Your name
          </label>
          <input
            type="text"
            id="username-success"
            className="bg-gray-50 border border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Username"
            {...register("username", { required: true })}
          />
          {/* <p className="mt-2 text-sm text-green-600 dark:text-green-500">
            <span className="font-medium">Alright!</span> Username available!
        </p> */}
        </div>
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
          {/* {errors.password && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">
                {errors.password.type === "required"
                  ? "Password is required"
                  : "Password must be at least 6 characters"}
              </span>
            </p>
          )} */}
        </div>
        <div className="flex items-start mb-6 text-white">
          {" "}
          Already have an account??
          <Link to={"/login"}>
            <p className="ms-2 text-blue-600 cursor-pointer">Log in</p>
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

export default Signup;
