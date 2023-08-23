import { useState } from "react";
import styles from "./Login.module.css";
// import PageNav from "../components/PageNav/PageNav";
import PageNavUpdated from "../components/PageNav/PageNavUpdated";
import { NavLink } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Signup({ user, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();
    console.log(email, password);

    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        window.location.href = window.location.origin;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <main className={styles.login}>
      <PageNavUpdated user={user} setUser={setUser} />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Your email address"
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Create a password"
          />
        </div>

        <div className={styles.loginFooter}>
          <button className={styles.btn} onClick={register}>
            Register
          </button>

          <NavLink className={styles.signupLink} to="/login">
            Already have an account? Log in here!
          </NavLink>
        </div>
      </form>
    </main>
  );
}
