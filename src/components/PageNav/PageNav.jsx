import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "../Logo/Logo";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../features/user";

export default function PageNav() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(clearUser());
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(user);
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>

        {!user.uid ? (
          <li>
            <NavLink to="/login" className={styles.ctaLink}>
              Login
            </NavLink>
          </li>
        ) : (
          <>
            <li>Welcome, {user.email}</li>
            <li>
              <NavLink
                to="/"
                className={styles.logoutLink}
                onClick={handleLogout}
              >
                Sign out
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
