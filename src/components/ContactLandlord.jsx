import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
export default function ContactLandlord(props) {
  const [message, setMessage] = useState("");
  const [landLord, setLandLord] = useState(null);
  useEffect(() => {
    async function getLandLordInfo() {
      const userRef = doc(db, "users", props.landLordId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setLandLord({ ...userSnap.data() });
      } else {
        toast.error("Sorry we have no information of the land lord");
      }
    }
    getLandLordInfo();
  }, [props.landLordId]);

  function handleMessage(event) {
    setMessage(event.target.value);
  }

  return (
    <div>
      {landLord ? (
        <div className="bg-yellow-300">
          <span>Landlord Details</span>
          <br />
          <span>Contact via email : </span>

          <button className="hover:bg-green-400 px-2 py-1 text-[15px] rounded mb-2 bg-black text-white">
            {landLord.email}
          </button>
          <br />
          <span>Name : {landLord.name}</span>
        </div>
      ) : (
        "Our system notices some unusual activities of this landlord. Details can't be shown."
      )}
      <form>
        <textarea
          className="mb-1 resize-none  border-[2px] w-full p-3 border-black"
          placeholder="Write a message"
          onChange={handleMessage}
          value={message}
          required
        ></textarea>
        {landLord && (
          <a
            href={`mailto:${landLord.email}?Subject=${props.listing.name}&body=${message}`}
          >
            <button
              type="button"
              className="uppercase w-full bg-blue-500 text-sm font-bold hover:bg-green-400 hover:text-white py-1 px-2"
            >
              send message
            </button>
          </a>
        )}
      </form>
    </div>
  );
}
