// import * as React from "react";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Day from "../DayItem/DayItem";
import { useDispatch } from "react-redux";
import { storeStats } from "../../features/stats";
import { muiTheme } from "../../utils/muiTheme";

dayjs.extend(isBetweenPlugin);

export default function Calendar() {
  const [value, setValue] = useState(dayjs());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(storeStats({ isStats: false, timestamp: 0 }));
    // eslint-disable-next-line
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        sx={{
          "&.MuiDateCalendar-root": {
            [muiTheme.breakpoints.down("xxs")]: {
              width: "95%",
              height: "61%",
              maxHeight: "40rem",
            },
            backgroundColor: "var(--color-brand--3)",
            borderRadius: "5px",
            overflowY: "scroll",
          },
          "& .MuiPickersCalendarHeader-root": {
            mt: 3.1,
            mb: 3.8,
            ml: 1.3,
            [muiTheme.breakpoints.down("xxs")]: {
              mt: 2,
              mb: 2,
            },
          },
          "& .MuiPickersCalendarHeader-labelContainer": {
            color: "var(--color-dark--1)",
            fontSize: "1.3rem",
            fontWeight: "600",
            [muiTheme.breakpoints.down("xxs")]: {
              fontSize: "1rem",
            },
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
          "& .MuiPickersYear-yearButton:hover": {
            backgroundColor: "var(--color-hover--1)",
          },
          "& .MuiDayCalendar-weekDayLabel": {
            width: "65px",
            color: "rgb(128, 17, 17)",
            fontSize: "1.3rem",
            fontWeight: "700",
            [muiTheme.breakpoints.down("xxs")]: {
              fontSize: "1rem",
            },
          },
          "& .MuiPickersDay-root": {
            [muiTheme.breakpoints.up("sm")]: { width: "65px" },
            [muiTheme.breakpoints.down("sm")]: { width: "65px" },
            [muiTheme.breakpoints.down("sm1")]: { width: "63px" },
            [muiTheme.breakpoints.down("sm2")]: { width: "61px" },
            [muiTheme.breakpoints.down("xxs")]: {
              width: "32px",
              height: "40px",
              fontSize: "1rem",
              fontWeight: 600,
            },
            fontSize: "1.3rem",
          },
          "& .MuiPickersDay-root:hover": {
            backgroundColor: "var(--color-hover--2)",
          },

          "& .MuiButtonBase-root.MuiPickersDay-root.Mui-selected, & .Mui-selected":
            {
              backgroundColor: "var(--color-selected--1)",
            },
        }}
        showDaysOutsideCurrentMonth
        fixedWeekNumber={6}
        value={value}
        onChange={(newValue) => setValue(newValue)}
        slots={{ day: Day }}
        slotProps={{
          day: {
            selectedDay: value,
          },
        }}
      />
    </LocalizationProvider>
  );
}
