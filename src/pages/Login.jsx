import { useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav/PageNav";
import { NavLink } from "react-router-dom";
import SnackbarComponent from "../components/SnackbarComponent/SnackbarComponent";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        window.location.href = "/app/calendar";
      })
      .catch((error) => {
        setErrorMessage(error.message);
      })
      .finally(setErrorMessage(""));
  };

  return (
    <main className={styles.login}>
      {errorMessage && <SnackbarComponent message={errorMessage} />}
      <PageNav />
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
            autoComplete="off"
            placeholder="Your password"
          />
        </div>
        <div className={styles.loginFooter}>
          <NavLink className={styles.signupLink} to="/signup">
            Don&apos;t have an account? Create one here!
          </NavLink>
          <button className={styles.btn} onClick={login}>
            Login
          </button>
        </div>
      </form>
    </main>
  );
}
