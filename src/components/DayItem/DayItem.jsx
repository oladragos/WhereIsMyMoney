import { styled } from "@mui/material/styles";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import dayjs from "dayjs";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import { Link } from "react-router-dom";

dayjs.extend(isBetweenPlugin);

//! STYLING
const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== "dayIsBetween" && prop !== "isFirstDay" && prop !== "isLastDay",
})(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: "var(--color-hover--1)",
    color: "var( --color-dark--0)",
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.dark,
    },
    width: "69px !important",
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
  //! eu
  const handleClickOnDay = function () {
    console.log(dataTimestamp);
  };

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
        onClick={handleClickOnDay}
      />
    </Link>
  );
}
