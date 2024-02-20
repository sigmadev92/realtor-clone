import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { MdLocationOn } from "react-icons/md";
import { FaBed } from "react-icons/fa";
import { FaBath, FaChair } from "react-icons/fa6";

import { FaParking } from "react-icons/fa";
import { getAuth } from "firebase/auth";

import { FaShare } from "react-icons/fa";
import ContactLandlord from "../components/ContactLandlord";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [sharelinkcopy, setsharelinkcopy] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchListing() {
      const auth = getAuth();
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap) {
        setListing(docSnap.data());
        console.log(docSnap.data());
        setLoading(false);
        if (
          !auth.currentUser ||
          docSnap.data().userRef !== auth.currentUser.uid
        )
          setShowButton(true);
      } else {
        setLoading(false);
        toast.error("Listing doesnot exits. Check the URL again and then try.");
        navigate("/profile");
      }
    }
    fetchListing();
  }, []);

  if (loading) return <Spinner />;

  return (
    <main>
      <swiper-container
        slides-per-view="1"
        speed="3000"
        loop="true"
        css-mode="true"
        autoplay={false}
        pagination
        navigation={listing.imgUrls.length < 2 && false}
      >
        {listing &&
          listing.imgUrls.map((img, index) => {
            return (
              <swiper-slide key={index}>
                <div
                  style={{
                    background: `url(${img}) center no-repeat`,
                  }}
                  className="w-[80%] mx-auto h-[300px] relative cursor-pointer"
                >
                  <FaShare
                    className="bg-black rounded-full h-5 w-5 p-1 fixed text-red-500 top-[30%] right-[10%] hover:text-white cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      setsharelinkcopy(true);
                      console.log("CLCICIC");
                      setTimeout(() => {
                        setsharelinkcopy(false);
                      }, 1000);
                    }}
                  />
                  {sharelinkcopy && (
                    <p className="p-2 fixed top-[20%] right-[3%] bg-black text-white z-10">
                      copied to clipboard
                    </p>
                  )}
                </div>
              </swiper-slide>
            );
          })}
      </swiper-container>

      <div className="w-full h-[300px] mt-[-250px]"></div>
      <div className="p-3 bg-white md:flex md:w-[80%] md:mx-auto w-[100%] md:px-3 mb-[30px]  shadow-md">
        <div
          className={`w-[100%] md:w-[50%] h-[300px]  bg-white ${
            clicked && "h-[500px]"
          } mb-3`}
        >
          <p className="ml-[3px] text-blue-500 font-bold">
            {listing.name} - ${listing.regPrice}
          </p>
          <p className="text-sm font-bold">
            <MdLocationOn className="inline mr-[5px] text-green-600 mb-[2px] text-[20px]" />
            {listing.address}
          </p>
          <button
            type="button"
            className="w-[40%]  bg-red-800 p-2 text-white my-[15px] hover:bg-black capitalize"
          >
            {listing.type === "rent" ? "For rent" : "To Buy"}
          </button>
          {listing.offer === "yes" && (
            <button
              type="button"
              className="bg-green-400 text-center w-[40%] ml-3 p-2 hover:bg-black hover:text-white"
            >
              offer
            </button>
          )}
          <p>
            {" "}
            <span className="font-bold text-sm">Description</span> -{" "}
            {listing.description}
          </p>
          <ul className="flex mt-8 justify-around text-[10px] font-bold">
            <li>
              {" "}
              <FaBed />
              {+listing.beds > 1 ? listing.beds + " Beds" : "1 Bed"}
            </li>
            <li>
              <FaBath />
              {+listing.baths > 1 ? listing.baths + " Baths" : "1 Bath"}
            </li>

            {listing.parking == "yes" && (
              <li>
                {" "}
                <FaParking /> Parking Spot
              </li>
            )}
            {listing.furnished == "yes" && (
              <li>
                {" "}
                <FaChair />
                Furnished
              </li>
            )}
          </ul>
          {showButton && (
            <div className="px-10 mt-[20px]">
              {clicked ? (
                <ContactLandlord
                  landLordId={listing.userRef}
                  listing={listing}
                />
              ) : (
                <button
                  className="w-full  bg-blue-500 uppercase text-sm py-1  cursor-pointer rounded-md font-bold hover:bg-black hover:text-white"
                  onClick={() => setClicked(true)}
                >
                  contact landlord
                </button>
              )}
              {clicked && (
                <button
                  className="w-full text-white bg-black hover:bg-red-400 font-bold text-[10px] py-2 mt-4"
                  onClick={() => setClicked(false)}
                >
                  No dont send
                </button>
              )}
            </div>
          )}
        </div>
        <div id="map" className=" w-[100%] md:w-[50%] h-[300px] z-10">
          {listing ? (
            <MapContainer
              center={[listing.geoLocation.lat, listing.geoLocation.long]}
              zoom={13}
              scrollWheelZoom={true}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={[listing.geoLocation.lat, listing.geoLocation.long]}
              >
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          ) : (
            "can't show map"
          )}
        </div>
      </div>
    </main>
  );
}
