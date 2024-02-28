import React from "react";
import avatar from "./../../assets/profile.png";
import styles from "../../styles/Login.module.scss";

const Register = ({handleLogin}) => {
  return (
    <div className="container mx-auto">
      <div className="flex h-screen justify-center items-center">
        <div className={`${styles.glass} h-8/9  flex justify-center`}>
          <form className="py-1">
          <h1 className="text-center text-[1.6em] pt-10">Register</h1>
            <div className="profile flex justify-center py-2">
              <label htmlFor="profile">
                <img
                  src={avatar}
                  alt="profile"
                  className={styles.profile_img}
                />
                <input type="file" id="profile" />
              </label>
            </div>

            <div className="textbox flex flex-col items-center">
              <input
                className={styles.textbox}
                type="text"
                placeholder="Name"
              />
              <input
                className={styles.textbox}
                type="text"
                placeholder="Email"
              />
              <input
                className={styles.textbox}
                type="password"
                placeholder="Password"
              />
              <input
                className={styles.textbox}
                type="password"
                placeholder="Conform password"
              />
              <button type="submit" className={`${styles.btn} bg-indigo-500`}>Register</button>
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
