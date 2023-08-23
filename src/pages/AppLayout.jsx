import CalendarSide from "../components/CalendarSide/CalendarSide";
import ExpensesContainer from "../components/ExpensesContainer/ExpensesContainer";
import styles from "./AppLayout.module.css";

function AppLayout({ expenseAdded }) {
  return (
    <div className={`${styles.app} row gx-0 me-0`}>
      <CalendarSide />
      <ExpensesContainer expenseAdded={expenseAdded} />
    </div>
  );
}

export default AppLayout;
