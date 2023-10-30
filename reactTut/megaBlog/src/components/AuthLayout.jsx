/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (authentication && authentication !== authStatus) {
      navigate("/login");
    } else if (!authentication && authentication !== authStatus) {
        navigate("/");
      }
    setLoader(false);
  }, [authStatus, authentication, navigate]);
  return loader ? <h1>... loading</h1> : <> {children}</>
}
