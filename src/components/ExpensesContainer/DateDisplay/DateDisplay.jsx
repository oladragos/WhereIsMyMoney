import { useParams } from "react-router-dom";

export default function DateDisplay() {
  const { timestamp } = useParams();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };
  const date = new Date(+timestamp).toLocaleDateString(undefined, options);

  return (
    <div>
      <p>
        {date === "Invalid Date"
          ? new Date().toLocaleDateString(undefined, options)
          : date}
      </p>
    </div>
  );
}
