import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PrivateRoute({ component: Component }) {
  const { currentUser } = useAuth();
  const location = useLocation();
  console.log(location.pathname);

  return currentUser ? (
    <Component />
  ) : (
    <Navigate state={location.pathname} to="/login" />
  );
}

export default PrivateRoute;
