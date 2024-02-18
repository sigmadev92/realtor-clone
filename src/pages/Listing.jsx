import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Pagination,
  Navigation,
} from "swiper";
import "swiper/css/bundle";

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  SwiperCore.use(Autoplay, Navigation, Pagination);
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

  if (loading) return <Spinner />;

  return (
    <main>
      <Swiper>
        {listing.imgUrls.map((img, index) => {
          <SwiperSlide key={index}>
            <div
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>;
        })}
      </Swiper>
    </main>
  );
}
