import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { expensesCategories } from "../../utils/expense";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { collection, where, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import { muiTheme } from "../../utils/muiTheme";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function StatsContainer() {
  const [value, setValue] = useState(0);

  const [expenses, setExpenses] = useState([]);

  const user = useSelector((state) => state.user.value);

  const getMonthYear = (timestamp) => {
    const ts = Number(timestamp);
    return { month: new Date(ts).getMonth(), year: new Date(ts).getFullYear() };
  };

  const { timestamp } = useParams();

  console.log(timestamp);

  const fetchPost = async () => {
    console.log(user.uid);
    const expensesCollectionRef = collection(db, "expenses");
    const q = query(
      expensesCollectionRef,
      where("expense.userID", "==", user.uid)
    );
    await getDocs(q)
      .then((res) => {
        const newData = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
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
  }, [timestamp, user]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      {!timestamp ? (
        <p className="ms-2">Select a month!</p>
      ) : (
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "var(--bs-gray-400)",
            display: "flex",
            height: "50vh",
            color: "var(--bs-gray-800)",
            "& .MuiButtonBase-root": {
              fontSize: "1.3rem",
              [muiTheme.breakpoints.down("290")]: {
                fontSize: "1rem",
                fontWeight: 600,
              },
            },
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            {expensesCategories.map((expense, i) => {
              const { categoryName, categoryEmoji } = expense;
              return (
                <Tab
                  key={categoryName}
                  label={`${categoryName} ${categoryEmoji}`}
                  {...a11yProps(i)}
                />
              );
            })}
          </Tabs>
          {/* //! Ceva de genul cu filter și mai multe */}
          {expensesCategories.map((expense, i) => {
            const { categoryName } = expense;

            return (
              <TabPanel key={categoryName} value={value} index={i}>
                SUM ={" "}
                {expenses
                  .filter(
                    (expense) =>
                      expense.expense.category === categoryName &&
                      getMonthYear(expense.expense.timestamp).month ===
                        getMonthYear(timestamp).month &&
                      getMonthYear(expense.expense.timestamp).year ===
                        getMonthYear(timestamp).year
                  )
                  .reduce((acc, expense) => {
                    return expense.expense.currency.label !== "RON"
                      ? acc +
                          +(
                            +expense.expense.price /
                            +expense.expense.currency.value
                          ).toFixed(2)
                      : acc + +expense.expense.price;
                  }, 0)}{" "}
                RON
              </TabPanel>
            );
          })}
        </Box>
      )}
    </div>
  );
}
