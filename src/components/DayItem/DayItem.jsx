import { styled } from "@mui/material/styles";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import dayjs from "dayjs";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import { Link } from "react-router-dom";
import { muiTheme } from "../../utils/muiTheme";

dayjs.extend(isBetweenPlugin);

//! STYLING
const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== "dayIsBetween" && prop !== "isFirstDay" && prop !== "isLastDay",
})(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: "var(--color-hover--1)",
    // color: "var(--color-dark--0)",
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.dark,
    },
    [muiTheme.breakpoints.up("510")]: {
      width: "70px !important",
    },
    [muiTheme.breakpoints.down("510")]: { width: "70px !important" },
    [muiTheme.breakpoints.down("490")]: { width: "68px !important" },
    [muiTheme.breakpoints.down("475")]: { width: "66px !important" },
    [muiTheme.breakpoints.down("450")]: { width: "62px !important" },
    [muiTheme.breakpoints.down("435")]: { width: "60px !important" },
    [muiTheme.breakpoints.down("410")]: { width: "57px !important" },
    [muiTheme.breakpoints.down("390")]: { width: "54px !important" },
    [muiTheme.breakpoints.down("370")]: { width: "51px !important" },
    [muiTheme.breakpoints.down("350")]: { width: "48px !important" },
    [muiTheme.breakpoints.down("330")]: { width: "45px !important" },
    [muiTheme.breakpoints.down("310")]: {
      width: "37px !important",
      padding: "18px",
    },
    [muiTheme.breakpoints.down("300")]: {
      fontSize: "1.1rem",
      fontWeight: 600,
      height: "40px",
    },
    [muiTheme.breakpoints.down("290")]: {
      width: "32px",
      fontSize: "1rem",
      fontWeight: 600,
    },
  }),
  ...(isFirstDay && {
    borderTopLeftRadius: "30%",
    borderBottomLeftRadius: "30%",
  }),
  ...(isLastDay && {
    borderTopRightRadius: "30%",
    borderBottomRightRadius: "30%",
  }),
}));

//! DAY FUNCTION
export default function Day(props) {
  const { day, selectedDay, "data-timestamp": dataTimestamp, ...other } = props;

  if (selectedDay == null) {
    return <PickersDay day={day} {...other} />;
  }

  const start = selectedDay.startOf("week");
  const end = selectedDay.endOf("week");

  const dayIsBetween = day.isBetween(start, end, null, "[]");
  const isFirstDay = day.isSame(start, "day");
  const isLastDay = day.isSame(end, "day");

  return (
    <Link to={`${dataTimestamp}`}>
      <CustomPickersDay
        {...other}
        day={day}
        sx={dayIsBetween ? { px: 2.5, mx: 0 } : {}}
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
      />
    </Link>
  );
}
