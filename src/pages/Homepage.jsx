import { Link } from "react-router-dom";
import PageNav from "../components/PageNav/PageNav";
import styles from "./Homepage.module.css";
import { useSelector } from "react-redux";

export default function Homepage() {
  const user = useSelector((state) => state.user.value);
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          You spend money almost everyday. Everybody does.
          <br />
          How about keeping track of those expenses?
        </h1>
        <h2>
          Where Is My Money? provides a solution for a healthy expenses
          management. Don&apos;t put yourself in an unexpected moneyless
          situation anymore.
        </h2>
        <Link
          to={Object.keys(user).length ? `/app/calendar` : "/login"}
          className="cta"
        >
          Get started
        </Link>
      </section>
    </main>
  );
}
