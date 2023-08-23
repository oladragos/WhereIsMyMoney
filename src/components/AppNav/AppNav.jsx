import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";

export default function AppNav() {
  return (
    <div className={styles.nav}>
      <ul>
        <li>
          <NavLink to="calendar">Calendar</NavLink>
        </li>
        <li>
          <NavLink to="stats">Stats</NavLink>
        </li>
      </ul>
    </div>
  );
}
