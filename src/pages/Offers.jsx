import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";
import { getAuth } from "firebase/auth";

export default function Offers() {
  const [offerListings, setOfferListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [size, setSize] = useState(3);
  const auth = getAuth();
  useEffect(() => {
    async function fetchOfferListings() {
      const listingsRef = collection(db, "listings");
      const q = query(
        listingsRef,
        where("offer", "==", "yes"),
        orderBy("timeStamp", "desc")
      );
      const querySnap = await getDocs(q);
      if (querySnap) {
        let listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setOfferListings(listings);
        console.log(listings);
        setLoading(false);
      }
    }
    fetchOfferListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <main>
      <h1 className="text-center font-bold text-[30px]">Offers</h1>
      <div className="w-[80%] mb-[30px] mx-auto mt-[30px] flex flex-wrap justify-between">
        {offerListings &&
          offerListings.map((doc, index) => {
            if (index < size)
              return (
                <ListingItem
                  key={doc.id}
                  listItem={doc.data}
                  id={doc.id}
                  auth={auth.currentUser.uid === doc.data.userRef}
                />
              );
          })}
      </div>
      <div className="px-[40%] mb-10">
        {!isClicked ? (
          <button
            className="w-full bg-green-400 py-1"
            onClick={() => {
              setIsClicked(true);
              setSize(offerListings.length);
            }}
          >
            Load More
          </button>
        ) : (
          <button
            className="w-full bg-green-400 py-1"
            onClick={() => {
              setIsClicked(false);
              setSize(3);
            }}
          >
            Load Less
          </button>
        )}
      </div>
    </main>
  );
}
