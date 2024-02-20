import { useEffect, useState } from "react";
import Slider from "../components/Slider";
import { db } from "../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";
import { getAuth } from "firebase/auth";

export default function Home() {
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [offers, setOffers] = useState([]);
  const [forRent, setForRent] = useState([]);
  const [toBuy, setToBuy] = useState([]);
  useEffect(() => {
    async function fetchListings() {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timeStamp", "desc"));
      const querySnap = await getDocs(q);

      let listings = [];
      querySnap.forEach((doc) => {
        if (doc.data().offer === "yes")
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
      });
      setOffers(listings);
      console.log(listings);
      listings = [];
      querySnap.forEach((doc) => {
        if (doc.data().type === "rent")
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
      });
      setForRent(listings);
      console.log(listings);

      listings = [];
      querySnap.forEach((doc) => {
        if (doc.data().type === "sell")
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
      });
      setToBuy(listings);
      console.log(listings);
      setLoading(false);
    }
    fetchListings();
  }, []);

  if (loading) return <Spinner />;

  return (
    <main>
      <Slider />

      <div className="mt-[40px]">
        {offers && (
          <div
            id="offers"
            className="md:w-[80%] mx-auto mb-8 w-full rounded-[14px]"
          >
            <h1 className="text-black  ml-3 font-bold">Recent offers</h1>
            <ul className="flex flex-wrap justify-between">
              {offers.map((doc, index) => {
                if (index < 4)
                  return (
                    <ListingItem
                      key={doc.id}
                      id={doc.id}
                      listItem={doc.data}
                      auth={auth.currentUser.uid === doc.data.userRef}
                    />
                  );
              })}
            </ul>
          </div>
        )}
        {forRent && (
          <div id="for-rent" className="md:w-[80%] mx-auto mb-8  w-full">
            <h1 className="ml-3 text-black font-bold ">Places for Rent</h1>
            <ul className="flex flex-wrap justify-between">
              {forRent.map((doc, index) => {
                if (index < 4)
                  return (
                    <ListingItem
                      key={doc.id}
                      id={doc.id}
                      listItem={doc.data}
                      auth={auth.currentUser.uid === doc.data.userRef}
                    />
                  );
              })}
            </ul>
          </div>
        )}
        {toBuy && (
          <div id="for-rent" className="md:w-[80%] mx-auto mb-8  w-full">
            <h1 className="text-black  ml-3 font-bold">Places To Buy</h1>
            <ul className="flex flex-wrap justify-between">
              {toBuy.map((doc, index) => {
                if (index < 4)
                  return (
                    <ListingItem
                      key={doc.id}
                      listItem={doc.data}
                      id={doc.id}
                      auth={auth.currentUser.uid === doc.data.userRef}
                    />
                  );
              })}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
