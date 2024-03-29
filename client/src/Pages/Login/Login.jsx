import React, { useEffect } from "react";
import axios from "./../../auth/axiosInstance.js";
import { useNavigate } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUser } from "./../../UserContext.jsx";

import styles from "../../styles/Login.module.scss";

const Login = ({ handleLogin }) => {
  const { updateUser } = useUser(); // use context
  useEffect(() => {localStorage.clear()}, [])
  
  const navigate = useNavigate();

  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email required!")
      .email("Invalid email format!"),
    password: Yup.string()
      .required("Password required!")
      .min(4, "Password must be 4 characters"),
  });

  // useFormik hook
  const formik = useFormik({
    initialValues: {
      email: "migara@gmail.com",
      password: "game1",
    },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      loginUser(values);
    },
  });

  const loginUser = async (data) => {
    await axios
      .post("/user/login", data)
      .then((res) => {
        const { accessToken, refreshToken, message, user } = res.data;
        localStorage.setItem("accessToken", accessToken);
        updateUser(user);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(user));

        toast.success(message);
        navigate("/dashboard");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex items-center justify-center min-h-screen">
        <div className={`${styles.glass} h-4/5  flex justify-center`}>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <h1 className="text-center text-[1.6em] pb-20 pt-20">Login</h1>

            <div className="flex flex-col items-center textbox">
              {/* email */}
              <input
                {...formik.getFieldProps("email")}
                className={styles.textbox}
                type="text"
                placeholder="Email"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="my-1 ml-3 font-semibold text-red-600">
                  {formik.errors.email}
                </div>
              )}

              {/* password */}
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type="password"
                placeholder="Password"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="my-1 ml-3 font-semibold text-red-600">
                  {formik.errors.password}
                </div>
              )}
              <button type="submit" className={`${styles.btn} bg-indigo-500`}>
                Login
              </button>
            </div>
            <div className="py-4 text-center">
              <span className="text-green-500">
                Not a Member?&nbsp;
                <span className="text-red-500" onClick={handleLogin}>
                  Register Now
                </span>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
