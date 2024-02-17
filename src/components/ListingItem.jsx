import { Link } from "react-router-dom";
import { MdLocationPin } from "react-icons/md";
import Moment from "react-moment";

export default function ListingItem({ listItem, id }) {
  return (
    <li>
      <Link to={`/category/${listItem.type}/${id}`}>
        <div className="h-[250px] w-[200px] border-[3px] relative border-white pt-0 cursor-pointer rounded-xl shadow-2xl bg-yellow-200 -m-2">
          <Moment
            fromNow
            className="absolute top-1 left-1 bg-pink-600 rounded-full z-10 text-[10px] py-1 px-3"
          >
            {listItem.timeStamp.toDate()}
          </Moment>
          <img
            src={listItem.imgUrls}
            className="w-full rounded-xl hover:scale-105 transition-scale duration-200 ease-in"
            alt="front image"
          />
          <div className="flex mt-2">
            <MdLocationPin className="text-red-400 mx-[4px] " />
            <p className="text-[12px] overflow-x-hidden truncate">
              {listItem.address}
            </p>
          </div>

          <p className="font-semibold ml-3 truncate">{listItem.name}</p>

          <span className="font-bold ml-3 text-green-500 max-30">
            ${" "}
            {listItem.offer === "no"
              ? listItem.regPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : (listItem.regPrice - listItem.discPrice)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>
          {listItem.type === "rent" && <span>/ Month</span>}
          <br />
          <div className="mt-1 font-extrabold text-xs">
            <span className="ml-3 mr-2">
              {listItem.beds > 1 ? listItem.beds + " Beds " : "1 Bed"}
            </span>
            <span>
              {listItem.baths > 1 ? listItem.baths + " Baths" : "Bath"}
            </span>
            <button type="button" className="ml-6 mr-2">
              E
            </button>
            <button type="button">D</button>
          </div>
        </div>
      </Link>
    </li>
  );
}
