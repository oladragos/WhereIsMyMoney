import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { useParams } from "react-router-dom";
import { expensesCategories } from "../../../utils/expense";
import styles from "./ExpensesCategories.module.css";
import { useSelector } from "react-redux";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
    textTransform: "uppercase",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function ExpensesCategories({ expenseAdded }) {
  const [expenses, setExpenses] = useState([]);
  const [expenseDeleted, setExpenseDeleted] = useState(false);

  const user = useSelector((state) => state.user.value);

  const { timestamp } = useParams();

  const fetchPost = async () => {
    const expensesCollectionRef = collection(db, "expenses");
    const q = query(
      expensesCollectionRef,
      where("expense.userID", "==", user.uid)
    );

    await getDocs(q)
      .then((res) => {
        const newData = res.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(newData);
        setExpenses(newData);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  useEffect(() => {
    if (timestamp && user.uid) {
      fetchPost();
    } else setExpenses([]);
    // eslint-disable-next-line
  }, [timestamp, expenseAdded, user, expenseDeleted]);

  const handleDeleteDoc = async (id) => {
    const docRef = doc(db, "expenses", id);
    await deleteDoc(docRef);
    setExpenseDeleted(!expenseDeleted);
  };

  return (
    <div className={styles.accordion}>
      {!timestamp ? (
        <p className="ms-2">Select a day!</p>
      ) : (
        expensesCategories.map((expense) => {
          const { categoryName, categoryEmoji } = expense;
          return (
            <Accordion
              key={expense.categoryName}
              sx={{
                "& .MuiAccordionDetails-root": {
                  display: "flex",
                  justifyContent: "space-between ",
                  alignItems: "center",
                },
              }}
            >
              <AccordionSummary
                aria-controls={`${categoryName}d-content`}
                id={`${categoryName}d-header`}
              >
                <Typography>
                  {categoryName} {categoryEmoji}
                </Typography>
              </AccordionSummary>

              {expenses
                .filter(
                  (expense) =>
                    expense.expense.timestamp === timestamp &&
                    expense.expense.category === categoryName
                )
                .map((filteredExpense) => (
                  <AccordionDetails key={filteredExpense.id}>
                    <div>
                      <Typography>
                        {filteredExpense.expense.expenseName}
                      </Typography>
                      <Typography>
                        {filteredExpense.expense.price}{" "}
                        {filteredExpense.expense.currency.label}
                        {filteredExpense.expense.currency.label !== "RON"
                          ? ` ~${(
                              filteredExpense.expense.price /
                              filteredExpense.expense.currency.value
                            ).toFixed(2)} RON`
                          : ""}
                      </Typography>
                      <Typography
                        sx={{ fontStyle: "italic", fontSize: "0.9rem" }}
                      >
                        {" "}
                        {filteredExpense.expense.notes}
                      </Typography>
                    </div>

                    <button
                      style={{
                        backgroundColor: "var(--color-logout--1)",
                        border: "none",
                        borderRadius: "10px",
                        fontFamily: "inherit",
                        padding: "8px 15px",
                        color: "var(--color-dark--0)",
                        fontWeight: "500",
                      }}
                      onClick={() => handleDeleteDoc(filteredExpense.id)}
                    >
                      Delete
                    </button>
                  </AccordionDetails>
                ))}
            </Accordion>
          );
        })
      )}
    </div>
  );
}
