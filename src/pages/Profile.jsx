import { getAuth } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  // if (userAuthentication == false) navigate("/sign-in");
  const auth = getAuth();

  const [formData, setData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const navigate = useNavigate();
  const { name, email } = formData;
  function handleClick() {
    auth.signOut();
    navigate("/sign-in");
  }

  return (
    <section>
      <h1 className="text-center text-xl font-bold rounded-3xl">My Profile</h1>
      <div className="w-[400px] mx-auto  rounded-3xl bg-blue-100 p-4 mt-5">
        <form action="">
          <input
            type="text"
            value={name}
            className="w-full my-4 h-8 px-2"
            disabled
          />
          <input
            type="email"
            value={email}
            className="w-full h-8 px-2"
            disabled
          />
          <div className="flex justify-between mt-2 text-sm px-2">
            <p>
              Do you want to cahnge your name?
              <span className="ml-2 text-red-500 cursor-pointer hover:text-black">
                Edit
              </span>
            </p>
            <p
              className="text-blue-500 cursor-pointer hover:text-black "
              onClick={handleClick}
            >
              Sign Out
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
