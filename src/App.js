import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Headers from "./components/Headers";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { PrivateProfile } from "./components/PrivateProfile";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import Listing from "./pages/Listing";
import Category from "./pages/Category";

function App() {
   return <>
    <Router>
      <Headers />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/profile" element={<PrivateProfile />}>
        <Route path="/profile" element={<Profile/>} />
        </Route>
        <Route path="/category/:categoryType" element={<Category />}/>
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/offers" element={<Offers/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/create-listing" element={<PrivateProfile />}>
        <Route path="/create-listing" element={<CreateListing />} />
        </Route>
        <Route path="/category/:listingType/:listingId" element={<Listing/>}/>
        <Route path="/edit-listing" element={<PrivateProfile />}>
        <Route path="/edit-listing/:listingId" element={<EditListing />} />
        </Route>
      </Routes>
      </Router>
      <ToastContainer
position="top-center"
autoClose={4000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
 
/>
   </>
} 

export default App;
