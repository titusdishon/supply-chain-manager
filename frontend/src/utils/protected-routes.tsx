import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  children: React.ReactNode;
}
const ProtectedRoute = ({ children }: IProps) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkUserToken = () => {
    const userToken = localStorage.getItem("token");
    if (!userToken || userToken === "undefined") {
      setIsLoggedIn(false);
      return navigate("/login");
    }
    setIsLoggedIn(true);
  };
  useEffect(() => {
    checkUserToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);
  return <React.Fragment>{isLoggedIn ? children : null}</React.Fragment>;
};
export default ProtectedRoute;
