import { Link, useNavigate } from "react-router-dom";
import { MdLocationPin, MdEdit, MdDelete } from "react-icons/md";
import Moment from "react-moment";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";

export default function ListingItem({ listItem, id, auth }) {
  const navigate = useNavigate();
  async function handleDelete(listingId) {
    if (window.confirm("Are you sure you want to delete the listing?")) {
      await deleteDoc(doc(db, "listings", id));

      toast.success("Listing deleted successfully");
    }
    navigate("/profile");
  }
  return (
    <div className="w-[100%] h-[100%] md:w-[350px] md:h-[100%] xl:w-[200px] xl:h-[280px] m-2 border-[3px] relative border-white pt-0 cursor-pointer rounded-xl shadow-2xl bg-yellow-200  hover:bg-white">
      <Moment
        fromNow
        className="absolute top-1 left-1 bg-pink-600 rounded-full z-10 text-[10px] py-1 px-3"
      >
        {listItem.timeStamp.toDate()}
      </Moment>
      <img
        src={listItem.imgUrls[0]}
        className="w-[100%] h-[50%] rounded-xl hover:scale-105 transition-scale duration-200 ease-in"
        alt="front image"
      />
      <div className="flex mt-2">
        <MdLocationPin className="text-red-400 mx-[4px] " />
        <p className="text-[12px] overflow-x-hidden truncate">
          {listItem.address}
        </p>
      </div>

      <p
        className="font-semibold ml-3 truncate cursor-pointer hover:text-red-500"
        onClick={() => navigate(`/category/${listItem.type}/${id}`)}
      >
        {listItem.name}
      </p>

      <span className="font-bold ml-3 text-green-500 max-30">
        ${" "}
        {listItem.offer === "no"
          ? listItem.regPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : (listItem.regPrice - listItem.discPrice)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </span>
      {listItem.type === "rent" && <span>/ Month</span>}
      <br />

      <span className="ml-3 mr-2 font-extrabold text-xs ">
        {listItem.beds > 1 ? listItem.beds + " Beds " : "1 Bed"}
      </span>
      <span className="font-extrabold text-xs ">
        {listItem.baths > 1 ? listItem.baths + " Baths" : "Bath"}
      </span>
      {auth && (
        <div className="mt-1 font-extrabold text-xs flex flex-row-reverse px-[10px]">
          <MdDelete
            className="text-xl cursor-pointer hover:bg-red-300"
            onClick={handleDelete}
          />
          <MdEdit
            className="ml-6 mr-3 text-purple-800 text-xl cursor-pointer hover:bg-red-300"
            onClick={() => navigate(`/edit-listing/${id}`)}
          />
        </div>
      )}
    </div>
  );
}
