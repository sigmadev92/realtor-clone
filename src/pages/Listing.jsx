import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

import { FaShare } from "react-icons/fa";

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sharelinkcopy, setsharelinkcopy] = useState(false);
  const params = useParams();

  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap) {
        setListing(docSnap.data());
        console.log(docSnap.data());
        setLoading(false);
      } else {
        setLoading(false);
        toast.error("Listing doesnot exits. Check the URL again and then try.");
        Navigate("/profile");
      }
    }
    fetchListing();
  }, []);
  function share(event) {}

  if (loading) return <Spinner />;

  return (
    <main>
      <div className="w-full h-[1000px] bg-white">
        <FaShare
          className="bg-black rounded-full h-5 w-5 p-1 fixed text-red-500 top-[30%] right-[3%] hover:text-white cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setsharelinkcopy(true);
            setTimeout(() => {
              setsharelinkcopy(false);
            }, 1000);
          }}
        />
        {sharelinkcopy && (
          <p className="p-2 fixed top-[20%] right-[3%] bg-black text-white ">
            copied to clipboard
          </p>
        )}
      </div>
    </main>
  );
}
