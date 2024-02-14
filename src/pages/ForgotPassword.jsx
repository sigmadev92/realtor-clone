import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import React from "react";
import { useState } from "react";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setmail] = useState("");
  function onchange(e) {
    setmail(e.target.value);
  }
  function handleClick() {
    console.log(email);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Link Sent successfully.Check you spam folder too.");
    } catch (err) {
      console.log(err);
      toast.error("The email you provided does not exist");
    }
  }

  return (
    <section>
      <h1 className="text-center mt-6 text-2xl font-bold">Recover Password </h1>
      <div className="flex flex-wrap justify-center mt-6">
        <div>
          <img
            src="https://plus.unsplash.com/premium_photo-1679857930663-e7c840a031ec?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8a2V5fGVufDB8fDB8fHww"
            alt="a key"
            className="h-[350px] rounded-2xl"
          />
        </div>
        <div className="h-100 w-0 md:w-[1px] xl:w-[1px] bg-black mx-[20px]" />
        <div className="  w-[350px] py-[20px]">
          <form onSubmit={handleSubmit}>
            <p className="text-bold">
              A link to reset the password will be sent to the email id you
              provide in the given box.
            </p>
            <input
              type="email"
              className="w-full mb-[30px] h-8 px-2 mt-3 text-blue-500"
              placeholder="enter your registered email"
              required
              id="email"
              value={email}
              onChange={onchange}
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-white w-full py-2"
              onClick={handleClick}
            >
              RESET PASSWORD
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
