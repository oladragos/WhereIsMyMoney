import styles from "./ExpensesContainer.module.css";
import ExpensesCategories from "../ExpensesCategories/ExpensesCategories";
import DateDisplay from "../DateDisplay/DateDisplay";
import { useSelector } from "react-redux";
import StatsContainer from "../StatsContainer/StatsContainer";
import Footer from "../Footer/Footer";

export default function ExpensesContainer({ expenseAdded }) {
  const isStats = useSelector((store) => store.stats.value.isStats);

  return (
    <div className={`${styles.expensesContainer} col-12 col-lg-6`}>
      {isStats ? (
        <>
          <DateDisplay />
          <StatsContainer />
          <Footer />
        </>
      ) : (
        <>
          <DateDisplay />
          <ExpensesCategories expenseAdded={expenseAdded} />
          <Footer />
        </>
      )}
    </div>
  );
}
