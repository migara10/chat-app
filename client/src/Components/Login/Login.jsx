import React from "react";
import avatar from "./../../assets/profile.png";
import styles from "../../styles/Login.module.scss";

const Register = ({ handleLogin }) => {
  return (
    <div className="container mx-auto">
      <div className="flex h-screen justify-center items-center">
        <div className={`${styles.glass} h-4/5  flex justify-center`}>
          <form className="py-1">
            <h1 className="text-center text-[1.6em] pb-20 pt-20">Login</h1>

            <div className="textbox flex flex-col items-center">
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

export default Register;
