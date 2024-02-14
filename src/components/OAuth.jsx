import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { useNavigate } from "react-router";

export default function OAuth() {
  const navigate = useNavigate();
  async function onGoogleClick(e) {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      //check for user
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      //if user not exist

      if (!docSnap.exists()) {
        setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timstamp: serverTimestamp(),
        });
      }

      console.log(user);
      navigate("/");
    } catch (error) {
      toast.error("Could not authorize user");
    }
  }
  return (
    <button
      onClick={onGoogleClick}
      type="button"
      className="bg-blue-700 w-full py-2 mt-2 text-white hover:bg-black rounded-xl"
    >
      SIGN IN WITH GOOGLE
      <img
        className="h-5 inline ml-1 mb-2 bg-white rounded-full"
        src="https://cdn-icons-png.flaticon.com/128/300/300221.png"
        alt="Google-icon"
      />
    </button>
  );
}
