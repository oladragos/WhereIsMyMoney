import { useParams } from "react-router-dom";

function SelectedDay() {
  const { timestamp } = useParams();
  const date = new Date(+timestamp).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <div>
      <p>{date}</p>
    </div>
  );
}

export default SelectedDay;

// Friday, July 7, 2023
// Fri Jul 07 2023
