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


function App() {
   return <>
    <Router>
      <Headers />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/profile" element={<PrivateProfile />}>
        <Route path="/profile" element={<Profile/>} />
        </Route>
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/offers" element={<Offers/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/create-listing" element={<PrivateProfile />}>
        <Route path="/create-listing" element={<CreateListing />} />
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
