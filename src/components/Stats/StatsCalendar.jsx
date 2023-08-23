import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { storeStats } from "../../features/stats";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import { useParams } from "react-router-dom";

export default function StatsCalendar() {
  const { timestamp } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(storeStats({ isStats: true, timestamp: timestamp }));
    // eslint-disable-next-line
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        views={["year", "month"]}
        openTo="year"
        onMonthChange={(month) => {
          console.log(typeof month);
          console.log(month.valueOf());
          window.location.href = "/app/stats/" + month.valueOf();
        }}
        sx={{
          backgroundColor: "var(--bs-gray-500)",
          color: "var(--bs-gray-900)",

          "&.MuiDateCalendar-root": {
            width: "90%",
            height: "65%",
            maxHeight: "35rem",
            borderRadius: "5px",
          },

          "& .MuiMonthCalendar-root": {
            width: "100%",
            height: "20rem",
          },

          "& .MuiPickersCalendarHeader-root": { mt: 3.1, mb: 3.8, ml: 1.3 },
          "& .MuiPickersCalendarHeader-labelContainer": {
            color: "var(--color-dark--1)",
            fontSize: "1.3rem",
            fontWeight: "600",
          },
          //! .MuiPickersMonth-monthButton this one was also on the next obj
          "& .MuiYearCalendar-root": {
            width: "96%",
            maxHeight: "400px",
          },

          "& .MuiPickersYear-root": {
            mb: 1.3,
          },
          "& .MuiPickersYear-yearButton": {
            color: "var(--color-dark--1)",
            fontSize: "1.3rem",
          },
          "& .MuiPickersMonth-monthButton": {
            color: "var(--color-dark--1)",
            fontSize: "1.3rem",
          },
          "& .MuiPickersYear-yearButton:hover": {
            backgroundColor: "var(--color-hover--1)",
          },
          "& .MuiDayCalendar-weekDayLabel": {
            width: "65px",
            color: "rgb(128, 17, 17)",
            fontSize: "1.3rem",
            fontWeight: "700",
          },
          "& .MuiPickersMonth-root": {
            width: "65px",
            height: "60px",
            fontSize: "1.3rem",
            color: "var(--color-dark--1)",
          },
          "& .MuiPickersDay-root:hover": {
            backgroundColor: "var(--color-hover--2)",
          },

          "& .MuiButtonBase-root.MuiPickersDay-root.Mui-selected, & .Mui-selected":
            {
              backgroundColor: "var(--color-selected--1)",
            },
        }}
      />
    </LocalizationProvider>
  );
}
