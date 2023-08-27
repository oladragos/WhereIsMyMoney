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
      <p className="ms-2 mt-2">
        {date === "Invalid Date"
          ? `Today is\n${new Date().toLocaleDateString(undefined, options)}`
          : `Selected: ${date}`}
      </p>
    </div>
  );
}
