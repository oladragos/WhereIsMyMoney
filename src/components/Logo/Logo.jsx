import styles from "./Logo.module.css";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <img src="/logo.png" alt="WhereIsMyMoney logo" className={styles.logo} />
    </Link>
  );
}

export default Logo;
