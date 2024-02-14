import { useLocation, useNavigate } from "react-router-dom";
export default function Headers() {
  const pathLocation = useLocation();
  const navigate = useNavigate();
  function pathMatchRouter(route) {
    console.log(pathLocation.pathname);
    if (pathLocation.pathname === route) return true;
  }
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
      <header className="flex justify-between items-center p-3 max-w-6xl mx-auto">
        <div>
          <img
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            className="h-5 cursor-pointer"
            onClick={() => navigate("/")}
            alt="logo"
          />
        </div>
        <div>
          <ul className="flex space-x-10">
            <li
              className={`cursor-pointer border-b-[3px] border-b-transparent border-b-m-[3px]${
                pathMatchRouter("/") && "text-blue-600 border-b-red-700"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`cursor-pointer border-b-[3px] border-b-transparent ${
                pathMatchRouter("/offers") && "text-black border-b-red-700"
              }`}
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>
            <li
              className={`cursor-pointer border-b-[3px] border-b-transparent ${
                pathMatchRouter("/sign-in") && "text-blue border-b-red-700"
              }`}
              onClick={() => navigate("/sign-in")}
            >
              Sign In
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
