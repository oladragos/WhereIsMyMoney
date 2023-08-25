import styles from "./CalendarSide.module.css";
import Logo from "../Logo/Logo";
import AppNav from "../AppNav/AppNav";
import { Outlet } from "react-router-dom";

export default function CalendarSide() {
  return (
    <div className={`${styles.sidebar} col-12 col-lg-6`}>
      <Logo />
      <AppNav />

      <Outlet />
    </div>
  );
}
