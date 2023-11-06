import React from "react";
import logo from "../assets/404.png";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="page-wrapper">
      <div className="preloader">
        <div className="custom-loader"></div>
      </div>

      <section className="error-page-area m-auto">
        <div className="container w-full mx-auto">
          <div className="error-page-content text-center">
            <div className="image mb-20 m-auto rmb-55 wow fadeInUp delay-0-4s">
              <img src={logo} alt="Error" className="m-auto" />
            </div>
            <div className="row justify-content-center wow fadeInUp delay-0-2s">
              <div className="col-xl-8 col-lg-10">
                <div className="section-title mb-20">
                  <h2>OPPS! This Pages Are Can’t Be Found </h2>
                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <Link to={"/"}>Go to home</Link>
                    <svg
                      className="w-3.5 h-3.5 ml-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PageNotFound;
