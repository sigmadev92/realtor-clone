import { useState } from "react";

export default function CreateListing() {
  const [formdata, setformdata] = useState({
    type: "rent",
    name: "",

    beds: 2,
    baths: 2,
    furnished: false,
    parking: false,
    address: "",
    description: "",
    offer: false,
    regPrice: 50,
    discPrice: 10,
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
  } = formdata;
  function onChange(event) {}
  return (
    <main className="max-w-md px-2 mx-auto font-bold">
      <h1 className="text-3xl text-center mt-6 mb-6 fond-bold">
        Create a Listing
      </h1>

      <form className=" bg-blue-300 px-4 py-3">
        <p className="mb-3">Sell/Rent</p>
        <div className="flex justify-between mb-4">
          <button
            type="button"
            id="type"
            className={` w-full mr-3 p-3 hover:bg-green-500 ${
              type === "sell" ? "bg-slate-500" : "bg-white"
            }`}
            onChange={onChange}
          >
            SELL
          </button>
          <button
            type="button"
            id="type"
            className={` w-full hover:bg-green-500 ${
              type === "rent" ? "bg-slate-500" : "bg-white"
            }`}
            onChange={onChange}
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
            />
          </div>
          <div className="w-[40%] p-3">
            <p>Baths</p>
            <input
              type="number"
              value={baths}
              id="beds"
              min="1"
              className="w-full p-4 text-center"
            />
          </div>
        </div>

        <p className="mb-3">Furnished</p>
        <div className="flex justify-between mb-4">
          <button
            type="button"
            id="furnished"
            className={` w-full mr-3 p-3 hover:bg-green-500 ${
              furnished ? "bg-slate-500" : "bg-white"
            }`}
            onChange={onChange}
          >
            YES
          </button>
          <button
            type="button"
            id="furnished"
            className={` w-full hover:bg-green-500 ${
              !furnished ? "bg-slate-500" : "bg-white"
            }`}
            onChange={onChange}
          >
            No
          </button>
        </div>
        <p className="mb-3">Parking</p>
        <div className="flex justify-between mb-4">
          <button
            type="button"
            id="parking"
            value={true}
            className={` w-full mr-3 p-3 hover:bg-green-500 ${
              parking ? "bg-slate-500" : "bg-white"
            }`}
            onChange={onChange}
          >
            YES
          </button>
          <button
            type="button"
            id="parking"
            value={false}
            className={` w-full hover:bg-green-500 ${
              !parking ? "bg-slate-500" : "bg-white"
            }`}
            onChange={onChange}
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
            className={` p-3 w-full mr-10 hover:bg-green-500 ${
              offer ? "bg-slate-500 text-white" : "bg-white"
            }`}
            onChange={onChange}
          >
            YES
          </button>
          <button
            type="button"
            id="offer"
            className={`w-full p-3 hover:bg-green-500 ${
              !offer ? "bg-slate-500 text-white" : "bg-white"
            }`}
            onChange={onChange}
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
        {offer && (
          <div>
            <p className="mb-3">Discounted Price</p>
            <div className="flex">
              <input
                type="number"
                id="discPrice"
                value={discPrice}
                required
                min="10"
                max={regPrice * 0.5}
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
          max={6}
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
