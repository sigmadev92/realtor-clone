import { useState } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
export default function CreateListing() {
  const [geoLocationEnabled, setGeoLocationEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const [formdata, setformdata] = useState({
    type: "rent",
    name: "",

    beds: 2,
    baths: 2,
    furnished: "yes",
    parking: "yes",
    address: "",
    description: "",
    offer: "yes",
    regPrice: 50,
    discPrice: 10,
    latitude: 0,
    longitude: 0,
    images: {},
  });
  const {
    type,
    name,

    beds,
    baths,
    furnished,
    parking,
    description,
    address,
    offer,
    regPrice,
    discPrice,
    latitude,
    longitude,
    images,
  } = formdata;

  function onChange(event) {
    if (event.target.files) {
      setformdata((prev) => ({
        ...prev,
        images: event.target.files,
      }));
    } else
      setformdata((prev) => ({
        ...prev,
        [event.target.id]: event.target.value,
      }));
  }
  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    // if(discPrice >= regPrice){
    //     setLoading(false);
    //     toast.error("Discount Price can not be greater than Regular price.")
    // }
    if (images.length > 6) {
      setLoading(false);
      toast.error("Images cannot be more than 6");
    }

    let geoLocation = {};
    if (geoLocationEnabled) {
      //that means developer has taken the GOOGLE API
      //Environmental variable is taken for that only.
      const response = await fetch(
        "https://geocode.maps.co/search?q=555+5th+Ave+New+York+NY+10017+US&api_key=65cf494c62218930720582wovc2c48f"
      );

      console.log(response.arrayBuffer);
      setLoading(false);
    } else {
      geoLocation.lat = latitude;
      geoLocation.long = longitude;
    }
    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
            setLoading(false);
          }
        );
      });
    }
    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      setLoading(false);
      toast.error("Images are not inserted in the database.");
      return;
    });
    const formDataCopy = {
      ...formdata,
      imgUrls,
      geoLocation,
      timeStamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
    };
    delete formDataCopy.images;
    delete formDataCopy.latitude;
    delete formDataCopy.longitude;
    if (offer === "no") {
      console.log(formDataCopy.offer);
      delete formDataCopy.discPrice;
    }

    const docRef = await addDoc(collection(db, "listings"), formDataCopy);
    // await setDoc(doc(db, "listings", auth.currentUser.uid), formDataCopy);
    setLoading(false);
    toast.success("Listing created");
    navigate(`/profile`);
  }

  if (loading) {
    return <Spinner />;
  }
  return (
    <main className="max-w-md px-2 mx-auto font-bold">
      <h1 className="text-3xl text-center mt-6 mb-6 fond-bold">
        Create a Listing
      </h1>

      <form className=" bg-blue-300 px-4 py-3" onSubmit={handleSubmit}>
        <p className="mb-3">Sell/Rent</p>
        <div className="flex justify-between mb-4">
          <button
            type="button"
            id="type"
            value="sell"
            className={` w-full mr-3 p-3 hover:bg-green-500 ${
              type === "sell" ? "bg-slate-500" : "bg-white"
            }`}
            onClick={onChange}
          >
            SELL
          </button>
          <button
            type="button"
            id="type"
            value="rent"
            className={` w-full hover:bg-green-500 ${
              type === "rent" ? "bg-slate-500" : "bg-white"
            }`}
            onClick={onChange}
          >
            RENT
          </button>
        </div>
        <p className="mb-3">Name</p>
        <input
          required
          maxLength="32"
          minLength="4"
          type="text"
          value={name}
          id="name"
          placeholder="Name"
          className="p-2 w-full mb-4"
          onChange={onChange}
        />
        <div className="flex justify-between px-5 mb-4">
          <div className="p-3 w-[40%]">
            <p>Beds</p>
            <input
              type="number"
              id="beds"
              value={beds}
              min="1"
              className="w-full p-4 text-center"
              onChange={onChange}
            />
          </div>
          <div className="w-[40%] p-3">
            <p>Baths</p>
            <input
              type="number"
              value={baths}
              id="baths"
              min="1"
              className="w-full p-4 text-center"
              onChange={onChange}
            />
          </div>
        </div>

        <p className="mb-3">Furnished</p>
        <div className="flex justify-between mb-4">
          <button
            type="button"
            id="furnished"
            value="yes"
            className={` w-full mr-3 p-3 hover:bg-green-500 ${
              furnished === "yes" ? "bg-slate-500" : "bg-white"
            }`}
            onClick={onChange}
          >
            YES
          </button>
          <button
            type="button"
            id="furnished"
            value="no"
            className={` w-full hover:bg-green-500 ${
              furnished === "no" ? "bg-slate-500" : "bg-white"
            }`}
            onClick={onChange}
          >
            No
          </button>
        </div>
        <p className="mb-3">Parking</p>
        <div className="flex justify-between mb-4">
          <button
            type="button"
            id="parking"
            value="yes"
            className={` w-full mr-3 p-3 hover:bg-green-500 ${
              parking === "yes" ? "bg-slate-500" : "bg-white"
            }`}
            onClick={onChange}
          >
            YES
          </button>
          <button
            type="button"
            id="parking"
            value="no"
            className={` w-full hover:bg-green-500 ${
              parking === "no" ? "bg-slate-500" : "bg-white"
            }`}
            onClick={onChange}
          >
            NO
          </button>
        </div>
        <p className="mb-3">Address</p>
        <textarea
          required
          id="address"
          value={address}
          rows="3"
          placeholder="Address"
          className="resize-none mb-4 p-2 w-full"
          onChange={onChange}
        ></textarea>
        <br />
        {!geoLocationEnabled && (
          <div className="flex justify-between mb-4">
            <div className="w-full mr-3">
              <p className="mb-3">Latitude</p>
              <input
                type="number"
                id="latitude"
                required
                value={latitude}
                onChange={onChange}
                min={-90}
                max={90}
                className="w-full text-center"
              />
            </div>
            <div className="w-full">
              <p className="mb-3">Longitude</p>
              <input
                type="number"
                id="longitude"
                required
                value={longitude}
                onChange={onChange}
                min={-180}
                max={180}
                className="w-full text-center"
              />
            </div>
          </div>
        )}
        <p className="mb-3">Description</p>
        <textarea
          required
          id="description"
          value={description}
          rows="3"
          placeholder="Description"
          className="resize-none mb-4 p-2 w-full"
          onChange={onChange}
        ></textarea>
        <br />
        <p className="mb-3">Offer</p>
        <div className="flex  mb-4">
          <button
            type="button"
            id="offer"
            value="yes"
            className={` p-3 w-full mr-10 hover:bg-green-500 ${
              offer === "yes" ? "bg-slate-500 text-white" : "bg-white"
            }`}
            onClick={onChange}
          >
            YES
          </button>
          <button
            type="button"
            id="offer"
            value="no"
            className={`w-full p-3 hover:bg-green-500 ${
              offer === "no" ? "bg-slate-500 text-white" : "bg-white"
            }`}
            onClick={onChange}
          >
            NO
          </button>
        </div>
        <p className="mb-3">Regular Price</p>
        <div className="flex mb-4">
          <input
            type="number"
            id="regPrice"
            value={regPrice}
            required
            min="50"
            max="400000000"
            className="text-center p-4 w-[50%] mr-4"
            onChange={onChange}
          />
          {type === "rent" && <div className="mt-4 text-white">$/Month</div>}
        </div>
        {offer === "yes" && (
          <div>
            <p className="mb-3">Discounted Price</p>
            <div className="flex">
              <input
                type="number"
                id="discPrice"
                value={discPrice}
                required
                min={0}
                max={regPrice * 0.9}
                className="text-center p-4 w-[50%] mr-4"
                onChange={onChange}
              />
              {type === "rent" && (
                <div className="mt-4 text-white">$/Month</div>
              )}
            </div>
          </div>
        )}

        <p className="mt-4 ">Images</p>
        <span className="mb-3 font-thin">
          The first image will be the cover(max 6).
        </span>
        <input
          required
          type="file"
          id="images"
          onChange={onChange}
          accept=".jpg,.jpeg,.png"
          max="6"
          className="bg-white p-3 mb-4"
          multiple
        />
        <button
          type="submit"
          className="w-full py-2 bg-black text-white hover:bg-green-400 mt-3 "
        >
          CREATE LISTING
        </button>
      </form>
    </main>
  );
}
