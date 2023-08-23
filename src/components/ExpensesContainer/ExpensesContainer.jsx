import styles from "./ExpensesContainer.module.css";
import ExpensesCategories from "./ExpensesCategories/ExpensesCategories";
import DateDisplay from "./DateDisplay/DateDisplay";
import { useSelector } from "react-redux";
import StatsContainer from "../StatsContainer/StatsContainer";

export default function ExpensesContainer({ expenseAdded }) {
  const isStats = useSelector((store) => store.stats.value.isStats);
  console.log(isStats);
  return (
    <div className={`${styles.expensesContainer} col-12 col-lg-6`}>
      {isStats ? (
        <StatsContainer />
      ) : (
        <>
          <DateDisplay />
          <ExpensesCategories expenseAdded={expenseAdded} />
        </>
      )}
    </div>
  );
}
