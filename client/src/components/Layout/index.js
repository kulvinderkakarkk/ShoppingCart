import React from "react";
import Header from "../Header";
import { Navigate, Outlet } from "react-router-dom";

export default function Layout () {
  const localStorageToken = localStorage.getItem("token");
    return (
      localStorageToken?(
    <>
      <Header />
      <Outlet />
    </>
      ):(
        <Navigate to="/login"  replace />
      )
  );
}