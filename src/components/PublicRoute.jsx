import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PublicRoute({ component: Component }) {
  const { currentUser } = useAuth();
  return currentUser ? <Navigate to="/" /> : <Component />;
}

export default PublicRoute;
