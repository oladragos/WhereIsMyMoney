import { useParams } from "react-router-dom";

export default function DateDisplay() {
  const { timestamp } = useParams();
  const options = {
    day: "numeric",
    weekday: "long",
    month: "long",
    year: "numeric",
  };
  const fullDate = new Date(+timestamp);

  const monthYear = fullDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div>
      <p className="ms-2 mt-2">
        {fullDate == "Invalid Date"
          ? `Today is ${new Date().toLocaleDateString("default", options)}`
          : window.location.pathname == `/app/calendar/${timestamp}`
          ? `Selected: ${fullDate.toLocaleDateString("default", options)}`
          : `Selected: ${monthYear}`}
      </p>
    </div>
  );
}
