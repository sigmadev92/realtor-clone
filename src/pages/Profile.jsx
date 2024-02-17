import { getAuth, updateProfile } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { FcHome } from "react-icons/fc";
import ListingItem from "../components/ListingItem";

export default function Profile() {
  // if (userAuthentication == false) navigate("/sign-in");
  const auth = getAuth();
  const [changedetail, setChangeDetail] = useState(false);
  const [clicked, setclicked] = useState(false);
  const [clickedOnce, setclickedOnce] = useState(0);
  const [listings, setListings] = useState([]);
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

  async function fetchUserListings() {
    if (clickedOnce == 1) return;
    const listingRef = collection(db, "listings");
    console.log("th");
    const q = query(
      listingRef,
      where("userRef", "==", auth.currentUser.uid),
      orderBy("timeStamp", "desc")
    );
    const querySnap = await getDocs(q);

    let listings2 = [];
    querySnap.forEach((doc) => {
      listings2.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    console.log(listings);
    setListings([...listings2]);
    console.log(listings2);
    console.log(listings);
  }
  async function handleEdit(listingId) {
    navigate(`/edit-listing/${listingId}`);
  }
  async function handleDelete(listingId) {
    if (window.confirm("Are you sure you want to delete the listing?")) {
      await deleteDoc(doc(db, "listings", listingId));
      const updatedListings = listings.filter((listing) => {
        listing.id !== listingId;
      });
      setListings([...updatedListings]);
      toast.success("Listing deleted successfully");
    }
    navigate("/profile");
  }

  return (
    <section>
      <h1 className="text-center text-xl font-bold rounded-3xl">My Profile</h1>
      <div className="max-w-[300px] min-w-[100px] mx-auto  rounded-3xl bg-blue-100 p-4 mt-5">
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
        <Link to="/create-listing">
          <button
            type="submit"
            className="text-sm w-full bg-blue-700 text-white py-2 mt-2 rounded-2xl hover:bg-black"
          >
            <FcHome className="ml-2 mb-[4px] inline bg-white h-5 w-5 rounded-full" />{" "}
            SELL OR RENT YOUR PROPERTY
          </button>
        </Link>
      </div>
      <div className="mt2 py-3">
        <h1
          className="text-center font-bold text-xl cursor-pointer"
          onClick={() => {
            fetchUserListings();
            setclickedOnce(1);
            console.log(listings);
            setclicked((prev) => !prev);
          }}
        >
          My Listings
        </h1>
        {clicked ? (
          <div className="max-w-[800px] mx-auto bg-white mt-4">
            {listings.length == 0 ? (
              <h1>You have no listings yet</h1>
            ) : (
              <ul className="flex justify-between flex-wrap min-w-[100px] sm:justify-center">
                {listings.map((item) => {
                  return (
                    <ListingItem
                      key={item.id}
                      id={item.id}
                      listItem={item.data}
                      onEdit={() => handleEdit(item.id)}
                      onDelete={() => handleDelete(item.id)}
                    />
                  );
                })}
              </ul>
            )}
          </div>
        ) : (
          <div>
            <h3 className="text-center">
              Click on above button to see your listings.
            </h3>
          </div>
        )}
      </div>
    </section>
  );
}
