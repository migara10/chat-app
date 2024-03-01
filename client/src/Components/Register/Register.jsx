import React, { useState } from "react";
import axios from "axios";

import avatar from "./../../assets/profile.png";
import base64 from "./../../Utils/ConvertImage";

import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";

import styles from "../../styles/Login.module.scss";

const Register = ({ handleLogin }) => {
  const [file, setFIle] = useState(null); // show image in browser
  const [imgUrl, setImgUrl] = useState(null); // send image path to backend

  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("name is required!"),
    email: Yup.string()
      .required("Email required")
      .email("Invalid Email format"),
    password: Yup.string()
      .required("")
      .matches(/[a-zA-Z]/, 'Password must need one character')
      .min(4, "Password must be 8 characters"),
    conformPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords Not match"
    ),
  });

  // useFormik hook
  const formik = useFormik({
    initialValues: {
      name: "migara",
      email: "migara@gmail.com",
      password: "game1",
      conformPassword: "game1",
    },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      registerUser(values);
    },
  });

  const uploadImage = async (e) => {
    const image = e.target.files[0];
    setImgUrl(image);
    const img = await base64(image);
    setFIle(img);
  };

  const registerUser = async (user) => {
    const { conformPassword, ...data } = user;

    const formData = new FormData();
    formData.append("file", imgUrl);
    
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    
    await axios
      .post("http://localhost:5000/user/register", formData)
      .then((res) => {
        toast.success(res.data.message);
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
            <h1 className="text-center text-[1.6em] pt-10">Register</h1>
            <div className="flex justify-center py-2 profile">
              <label htmlFor="profile">
                <img
                  src={file || avatar}
                  alt="profile"
                  className={styles.profile_img}
                />
                <input type="file" id="profile" onChange={uploadImage} />
              </label>
            </div>

            <div className="flex flex-col items-center textbox">
              {/* name */}
              <input
                {...formik.getFieldProps("name")}
                className={`${styles.textbox} mt-0`}
                type="text"
                placeholder="Name"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="my-1 ml-3 font-semibold text-red-600">
                  {formik.errors.name}
                </div>
              )}

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

              {/* conform password */}
              <input
                {...formik.getFieldProps("conformPassword")}
                className={styles.textbox}
                type="password"
                placeholder="Conform password"
              />
              {formik.touched.conformPassword &&
                formik.errors.conformPassword && (
                  <div className="my-1 ml-3 font-semibold text-red-600">
                    {formik.errors.conformPassword}
                  </div>
                )}

              <button type="submit" className={`${styles.btn} bg-indigo-500`}>
                Register
              </button>
            </div>
            <div className="py-4 text-center">
              <span className="text-green-500">
                Already Member?&nbsp;
                <span className="text-red-500" onClick={handleLogin}>
                  Login Now
                </span>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
