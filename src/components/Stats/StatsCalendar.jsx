import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { storeStats } from "../../features/stats";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useParams } from "react-router-dom";
import { muiTheme } from "../../utils/muiTheme";

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
          window.location.href = "/app/stats/" + month.valueOf();
        }}
        sx={{
          backgroundColor: "var(--bs-gray-500)",
          color: "var(--bs-gray-900)",

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
            [muiTheme.breakpoints.down("310")]: {
              fontSize: "1rem",
            },
          },
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
        }}
      />
    </LocalizationProvider>
  );
}
