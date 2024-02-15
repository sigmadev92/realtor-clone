import spinner from "../assets/svg/spinner.svg";

export default function Spinner() {
  return (
    <div className="flex justify-center">
      <img src={spinner} alt="loading" />
    </div>
  );
}
