import { BrowserRouter, Route, Routes } from "react-router-dom";
import Calendar from "./components/Calendar/Calendar";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import StatsCalendar from "./components/Stats/StatsCalendar";
import { useState } from "react";
import Signup from "./pages/Signup";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { storeUser, clearUser } from "./features/user";

function App() {
  const [expenseAdded, setExpanseAdded] = useState(false);
  const dispatch = useDispatch();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const loggedUser = {
        email: user.email,
        uid: user.uid,
      };
      dispatch(storeUser(loggedUser));
    } else {
      console.log("User is logged out");
      dispatch(clearUser());
    }
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="product" element={<Product />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="contact" element={<Contact />} />
        <Route path="app" element={<AppLayout expenseAdded={expenseAdded} />}>
          <Route index element={<Calendar />} />
          <Route path="calendar" element={<Calendar />} />
          <Route
            path="calendar/:timestamp"
            element={
              <ExpenseForm
                expenseAdded={expenseAdded}
                setExpanseAdded={setExpanseAdded}
              />
            }
          />
          <Route path="stats" element={<StatsCalendar />} />
          <Route path="stats/:timestamp" element={<StatsCalendar />} />
          <Route
            path="form"
            element={
              <ExpenseForm
                expenseAdded={expenseAdded}
                setExpanseAdded={setExpanseAdded}
              />
            }
          />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
