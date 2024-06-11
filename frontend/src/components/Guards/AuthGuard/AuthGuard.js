import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { isTokenValid } from "../../../utils/auth";
import { logout, userInfo } from "../../../redux/authSlice";
import Loader from "../../Loader";
export const AuthGuard = ({ children }) => {
  const nonAuthPaths = [
    "/accept-invite",
    "/password-reset",
    "/request-reset",
    "/",
    "/login",
    "/location",
  ];
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const auth = useSelector((state) => state?.auth);
  const token = isTokenValid();
  const { state } = useLocation();
  const role = localStorage.getItem("role");
  //   const isIpcAdmin = role === "super admin" || role === "operator admin";

  useEffect(() => {
    token && dispatch(userInfo());
    if (pathname === "/login") {
      const redirectPath = localStorage.getItem("redirectPath");
      if (token) {
        navigate(redirectPath || "/");
      }
    } else if (!token) {
      localStorage.setItem("redirectPath", pathname);
      navigate("/login");
    }
  }, [token, dispatch, navigate, pathname]);

  const loginUrl = "/login";
  const signUpUrl = "/signup";

  if (auth.error) {
    localStorage.setItem("user", null);
    if (pathname !== loginUrl && pathname !== signUpUrl) navigate(loginUrl);
    // window.location.reload(false);
  }

  if (token) {
    // allow user to hit root or login page
    let dashboardUrl = "/";

    // if (isIpcAdmin) {
    //   // redirect sa's with no account id to account select
    //   dashboardUrl = "/admin";
    // } else {
    //   dashboardUrl = "/";
    // }

    if (state?.from) {
      navigate(state?.from);
    }

    // redirect users with token to dashboard if not already on dashboard
    if (pathname === loginUrl) {
      navigate(dashboardUrl);
    }
  } else {
    // unauthenticated user actions
    // allow user to non auth pages
    const isNonAuthPath = nonAuthPaths.some((path) => pathname.includes(path));

    if (isNonAuthPath) return children;
    localStorage.setItem("redirectPath", pathname);
  }

  // if (!loading) dispatch(buildPermsList());

  // if loading show loader else show app
  return loading ? <Loader /> : children;
};
