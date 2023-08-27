import styles from "./ExpenseForm.module.css";
import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Link, useParams } from "react-router-dom";
import { expensesCategories } from "../../utils/expense";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { muiTheme } from "../../utils/muiTheme";

const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

export default function ExpenseForm({ expenseAdded, setExpanseAdded }) {
  const { timestamp } = useParams();
  const [category, setCategory] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState(null);
  const [notes, setNotes] = useState("");
  const user = useSelector((state) => state.user.value);
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(false);
  const [currencies, setCurrencies] = useState([]);

  //* CURRENCY API
  useEffect(function () {
    async function fetchCurrencies() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/ron.json`);
        const data = await res.json();
        console.log(data);
        const dataArray = Object.entries(data.ron).map(([currency, value]) => {
          return {
            label: currency.toUpperCase(),
            value: value,
          };
        });
        setCurrencies(dataArray);
      } catch {
        alert("There was an error loading data...");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCurrencies();
  }, []);

  const addExpense = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "expenses"), {
        expense: {
          userID: user.uid,
          timestamp: timestamp,
          category: category,
          expenseName: expenseName,
          price: price,
          currency: currency,
          notes: notes,
        },
      });
      setExpanseAdded(!expenseAdded);
      setCategory("");
      setExpenseName("");
      setPrice(0);
      setNotes("");
      setCurrency(null);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const HandleBackButton = (e) => {
    e.preventDefault();
  };

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label>Select a category</label>
        {category === "" && (
          <p className={styles.warningMessage}>
            Please select a category first!
          </p>
        )}
        <select onChange={(e) => setCategory(e.target.value)} value={category}>
          <option value="">...</option>
          {expensesCategories.map((expense) => (
            <option key={expense.categoryName} value={expense.categoryName}>
              {expense.categoryName}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.row}>
        <label htmlFor="expenseName">Expense name</label>
        <input
          type="text"
          id="expenseName"
          onChange={(e) => setExpenseName(e.target.value)}
          placeholder="What did you buy?"
          value={expenseName}
          disabled={!category}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.priceContainer}>
        <label htmlFor="price">Price</label>
        <div className={styles.inputSelectContainer}>
          <div className={styles.priceInput}>
            <input
              type="Number"
              id="price"
              onChange={(e) => setPrice(e.target.value)}
              placeholder="How much was it?"
              value={price}
            />
          </div>

          <div className={styles.currenciesSelect}>
            <Autocomplete
              options={currencies}
              getOptionLabel={(option) => option.label}
              onChange={(e, newValue) => {
                setCurrency(newValue);
              }}
              value={currency}
              disablePortal
              id="combo-box-demo"
              size="small"
              sx={{
                backgroundColor: "var(--color-light--3)",
                borderRadius: "5px",
                width: "100%",
                "& + .MuiAutocomplete-popper .MuiAutocomplete-option": {
                  backgroundColor: "var(--color-light--3)",
                },
                "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
                  [muiTheme.breakpoints.down("290")]: {
                    padding: "3px 6px 3px 6px",
                  },
                },
                "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected='true']":
                  {
                    backgroundColor: "var(--color-light--3)",
                    padding: 0,
                  },
                // "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected ='true'].Mui-focused":
                //   {
                //     backgroundColor: "var(--color-light--3)",
                //   },

                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid var(--color-light--3)",
                },
                "&.Mui-focused .MuiInputLabel-outlined": {
                  color: "black",
                  fontSize: "15pt",
                  fontFamily: "inherit",
                },
              }}
              renderInput={(params) => (
                <TextField {...params} placeholder="Currency" />
              )}
            />
          </div>
        </div>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your expense</label>
        <textarea
          value={notes}
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <div className={styles.buttons}>
        <button
          onClick={addExpense}
          className={`${styles.btn} ${styles.btnAdd}`}
        >
          Add
        </button>
        <button
          onClick={HandleBackButton}
          className={`${styles.btn} ${styles.btnBack}`}
        >
          <Link className={styles.backLink} to={"/app/calendar"}>
            &larr; Back
          </Link>
        </button>
      </div>
    </form>
  );
}
