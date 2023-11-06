import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";

import styles from "../styles/Username.module.css";
import extend from "../styles/Profile.module.css";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar/Navbar";

function Profile() {
  const [file, setFile] = useState();
  const [myfile, setMyfile] = useState();
  const user = useAuth();
  const currentUser = user.currentUser;

  useEffect(() => {
    console.log(currentUser);
    setFile(currentUser.photoURL);
    setMyfile(localStorage.getItem("profilePicture"));
  }, []);

  return (
    <div className="container mx-auto ">
      <Navbar />
      <div className="flex justify-center items-center h-screena">
        <div
          className={`${styles.glass} ${extend.glass} bg-gray-600 mt-20`}
          style={{ width: "50%" }}
        >
          <div className="title flex  flex-col items-center mt-10 ">
            <h4 className="text-3xl font-bold text-white">Profile</h4>
          </div>

          <form className="py-1">
            <div className="profile flex justify-center py-4">
              <label>
                <img
                  id="profile"
                  className={`${styles.profile_img} ${extend.profile_img}`}
                  src={file || myfile || avatar}
                  alt="avatar"
                />
              </label>
            </div>

            <div className="textbox flex flex-col items-center gap-6 mt-10">
              <div className="name flex-col flex justify-center w-3/4 gap-4 text-2xl">
                <h1 className="text-white">
                  <span className="text-rose-500">Name: </span>
                  <br />
                  {currentUser.displayName}
                </h1>

                <h1 className="text-white">
                  <span className="text-rose-500">Email: </span>

                  {currentUser.email}
                </h1>
              </div>

              <div className="name justify-center flex w-3/4 gap-10"></div>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                come back later?{" "}
                <Link className="text-red-500" to="/">
                  Go Back
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
