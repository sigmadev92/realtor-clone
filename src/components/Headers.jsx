import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Headers() {
  const pathLocation = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();

  const [pageState, setPageState] = useState("Sign In");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setPageState("Profile");
      else setPageState("Sign In");
    });
  }, [auth]);
  function pathMatchRouter(route) {
    if (pathLocation.pathname === route) {
      console.log(pathLocation.pathname);

      return true;
    }
    return false;
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
              className={`cursor-pointer border-b-[3px] ${
                pathMatchRouter("/")
                  ? "text-blue-600 border-b-red-600"
                  : "border-b-transparent"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`cursor-pointer ${
                pathMatchRouter("/offers") &&
                "border-b-[3px] text-blue-600 border-b-red-600"
              }`}
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>
            <li
              className={`cursor-pointer border-b-[3px] ${
                pathMatchRouter("/sign-in") || pathMatchRouter("/profile")
                  ? "text-blue-600 border-b-red-600 "
                  : "border-b-transparent"
              }`}
              onClick={() => {
                navigate("/profile");
              }}
            >
              {pageState}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
