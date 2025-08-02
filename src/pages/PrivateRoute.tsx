import React from "react";
import { useAppSelector } from "../redux/reduxHooks";
import { Navigate } from "react-router-dom";

interface IPrivateProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<IPrivateProps> = ({ children }) => {
  const { user } = useAppSelector((store) => store.user);
  if (user) {
    return <>{children}</>
  }
  return <Navigate to="/"></Navigate>;
};

export default PrivateRoute;
