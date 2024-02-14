import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";

export default function Profile() {
  // if (userAuthentication == false) navigate("/sign-in");
  const auth = getAuth();
  const [changedetail, setChangeDetail] = useState(false);
  const [formData, setData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const navigate = useNavigate();
  const { name, email } = formData;
  function handleClickSignOut() {
    auth.signOut();
    navigate("/sign-in");
  }
  function onChange(event) {
    setData((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  }
  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        //update name in the firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
      }
      //update name in the firestore
      const docRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(docRef, {
        name,
      });
      toast.success("Profile details updated successfully");
    } catch (error) {
      toast.error("Could not edit the details");
    }
  }
  return (
    <section>
      <h1 className="text-center text-xl font-bold rounded-3xl">My Profile</h1>
      <div className="w-[400px] mx-auto  rounded-3xl bg-blue-100 p-4 mt-5">
        <form action="">
          <input
            type="text"
            value={name}
            id="name"
            className="w-full my-4 h-8 px-2"
            disabled={!changedetail}
            onChange={onChange}
          />
          <input
            type="email"
            value={email}
            className="w-full h-8 px-2"
            disabled
          />
          <div className="flex justify-between mt-2 text-[10px] px-2">
            <p>
              Do you want to change details?
              <span
                className="ml-2 text-red-500 cursor-pointer hover:text-black"
                onClick={() => {
                  changedetail && onSubmit();
                  setChangeDetail((prev) => !prev);
                }}
              >
                {changedetail ? "Apply Changes" : "Edit"}
              </span>
            </p>
            <p
              className="text-blue-500 cursor-pointer hover:text-black "
              onClick={handleClickSignOut}
            >
              Sign Out
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
