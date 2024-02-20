import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { db } from "../firebase";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";
import { getAuth } from "firebase/auth";

export default function Category() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  useEffect(() => {
    async function fetchListings() {
      const listingsRef = collection(db, "listings");
      if (params.categoryType !== "rent" && params.categoryType !== "sell") {
        toast.error(
          "Sorry but the link is not valid.You are redirected to home page"
        );
        navigate("/");
      }
      const q = query(listingsRef, orderBy("timeStamp", "desc"));

      const querySnap = await getDocs(q);

      if (querySnap) {
        let listings2 = [];
        querySnap.forEach((doc) => {
          if (doc.data().type === params.categoryType)
            return listings2.push({
              id: doc.id,
              data: doc.data(),
            });
        });
        setListings(listings2);
        setLoading(false);
      } else {
        toast.error("URL IS INCORRECT");
        setLoading(false);
      }
    }
    fetchListings();
  }, []);
  if (loading) return <Spinner />;
  return (
    <main>
      <h1 className="text-center text-[20px] mb-[20px] font-bold">
        {params.categoryType === "sell"
          ? "Properties for Sale"
          : "Properties for Rent"}
      </h1>

      <div className="w-[80%] h-[300px] flex flex-wrap mx-auto mb-[20px] justify-between">
        {listings &&
          listings.map((doc) => {
            return (
              <ListingItem
                key={doc.id}
                id={doc.id}
                listItem={doc.data}
                auth={
                  auth.currentUser != null &&
                  doc.data.userRef === auth.currentUser.uid
                }
              />
            );
          })}
      </div>
    </main>
  );
}
