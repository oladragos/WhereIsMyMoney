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
      {/* .box::-webkit-scrollbar,
.list::-webkit-scrollbar {
  display: none;
  scroll-behavior: smooth;
} */}
      <DateCalendar
        sx={{
          "&.MuiDateCalendar-root": {
            [muiTheme.breakpoints.down("510")]: {
              width: "95%",
            },
            [muiTheme.breakpoints.down("300")]: {
              minHeight: "360px",
            },
            [muiTheme.breakpoints.up("510")]: {
              width: "31rem",
            },

            minHeight: "515px",
            backgroundColor: "var(--color-brand--3)",
            borderRadius: "5px",
          },
          "& .MuiPickersCalendarHeader-root": {
            mt: 3.1,
            mb: 3.8,
            ml: 1.3,
            [muiTheme.breakpoints.down("290")]: {
              mt: 2,
              mb: 2,
            },
          },
          "& .MuiPickersCalendarHeader-labelContainer": {
            color: "var(--color-dark--1)",
            fontSize: "1.3rem",
            fontWeight: "600",
            [muiTheme.breakpoints.down("310")]: {
              fontSize: "1rem",
            },
          },
          //! .MuiPickersMonth-monthButton this one was also on the next obj
          "& .MuiYearCalendar-root": {
            width: "100%",
            maxHeight: "400px",
          },

          "& .MuiYearCalendar-root::-webkit-scrollbar": {
            display: "none",
            scrollBehavior: "smooth",
            width: "0 !important",
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
            [muiTheme.breakpoints.down("290")]: {
              fontSize: "1rem",
            },
          },
          "& .MuiPickersDay-root": {
            [muiTheme.breakpoints.up("sm")]: {
              width: "65px",
            },
            [muiTheme.breakpoints.up("510")]: { width: "65px" },
            [muiTheme.breakpoints.down("510")]: { width: "65px" },
            [muiTheme.breakpoints.down("490")]: { width: "63px" },
            [muiTheme.breakpoints.down("475")]: { width: "61px" },
            [muiTheme.breakpoints.down("450")]: { width: "57px" },
            [muiTheme.breakpoints.down("435")]: { width: "55px" },
            [muiTheme.breakpoints.down("410")]: { width: "52px" },
            [muiTheme.breakpoints.down("390")]: { width: "49px" },
            [muiTheme.breakpoints.down("370")]: { width: "46px" },
            [muiTheme.breakpoints.down("350")]: { width: "43px" },
            [muiTheme.breakpoints.down("330")]: { width: "40px" },
            [muiTheme.breakpoints.down("310")]: { width: "37px" },
            [muiTheme.breakpoints.down("300")]: {
              width: "37px",
              fontSize: "1.1rem",
              fontWeight: 600,
              height: "40px",
            },
            [muiTheme.breakpoints.down("290")]: {
              width: "32px",
              fontSize: "1rem",
              fontWeight: 600,
            },
            fontSize: "1.3rem",
            height: "60px",
          },
          "& .MuiPickersDay-root:hover": {
            backgroundColor: "var(--color-hover--2)",
          },

          "& .MuiButtonBase-root.MuiPickersDay-root.Mui-selected, & .Mui-selected":
            {
              backgroundColor: "var(--color-selected--1)",
            },

          "& .Mui-selected": {
            backgroundColor: "var(--color-selected--1) !important",
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
