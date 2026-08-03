import { useState } from "react";
import darkCatImg from "../assets/images/darkCat.jpeg";
import { motion } from "motion/react";
import { em } from "motion/react-client";

import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { authApi } from "../API/AuthApi";

function Auth({ loginOrRegister }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e, username, email, password) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      //call the backend API to register
      if (loginOrRegister === "Register") {
        const data = await authApi.register(username, email, password);
      } else {
        const data = await authApi.login(email, password);
      }

      //save the JWT token and user data to context/loacalStorage
      login(data.user, data.access_token);

      //Redirect to dashboard on success
      navigate("/dashboard");
    } catch (err) {
      //show error message from backend, or a generic one
      setError(
        err.response?.data?.message || "Registration Failed.Please try again",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-4 h-screen  flex justify-center items-center tablet:p-8 bg-page-bg ">
      <div className="  w-[clamp(100px,100%,2000px)] h-[clamp(100px,100%,600px)]  rounded-xl">
        <div className="bg-surface-bg h-full w-full rounded-xl grid  p-4 gap-5  grid-cols-1 tablet:grid-cols-2">
          <div className="h-full min-h-full hidden tablet:block">
            <img src={darkCatImg} alt="" className="h-full rounded-xl " />
          </div>
          <div className="flex flex-col gap-5 ">
            <div className="flex justify-end">
              <motion.button
                className="rounded-md bg-accent-bg text-white px-4 py-2.5 cursor-pointer"
                whileHover={{ scale: 1.1, outline: "2px white solid ", y: -2 }}
              >
                {loginOrRegister === "Register" ? "Login" : "Register"}
              </motion.button>
            </div>
            <h1 className="text-white text-2xl font-semibold tracking-tight">
              {loginOrRegister === "Login" ? "Welcome Back!" : "Welcome"}
            </h1>
            <p className="text-surface-muted-fg text-sm">
              Lets start your learning journey
            </p>
            <form
              action=""
              className="text-surface-muted-fg"
              onSubmit={(e) => handleSubmit(e, userName, email, password)}
            >
              <div className="flex justify-center flex-wrap gap-5">
                {loginOrRegister === "Register" && (
                  <motion.input
                    type="text"
                    placeholder="Enter your username"
                    className="w-full bg-surface-muted-bg py-4 px-4  rounded-lg   outline-0"
                    whileHover={{ outline: "2px white solid ", y: -2 }}
                    whileFocus={{ outline: "2px white solid ", y: -2 }}
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                )}
                <motion.input
                  type="text"
                  placeholder="Enter your email"
                  className="w-full bg-surface-muted-bg py-4 px-4  rounded-lg   outline-0"
                  whileHover={{ outline: "2px white solid ", y: -2 }}
                  whileFocus={{ outline: "2px white solid ", y: -2 }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <motion.input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full bg-surface-muted-bg py-4 px-4  rounded-lg   outline-0"
                  whileHover={{ outline: "2px white solid ", y: -2 }}
                  whileFocus={{ outline: "2px white solid ", y: -2 }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {loginOrRegister === "Login" && (
                <div className="flex justify-end ">
                  <a href="#" className="text-white text-sm">
                    Forgot your password?
                  </a>
                </div>
              )}
              <div className="flex justify-center">
                <motion.button
                  type="submit"
                  whileHover={{ outline: "2px white solid ", y: -2 }}
                  className="w-full bg-accent-bg text-accent-fg text-sm font-semibold rounded-lg px-4 py-3 cursor-pointer mt-5"
                >
                  {loginOrRegister}
                </motion.button>
              </div>
            </form>
            <div className="flex justify-center">
              <p className="text-surface-muted-fg text-sm">
                {loginOrRegister === "Register"
                  ? "Already have an account?"
                  : "Dont have an account?"}
                <Link
                  to={loginOrRegister === "Register" ? "/login" : "/register"}
                  className="text-white"
                >
                  {" "}
                  {loginOrRegister === "Register" ? "Login" : "Register"}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Auth;
