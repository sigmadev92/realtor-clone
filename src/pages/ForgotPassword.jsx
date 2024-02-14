import React from "react";
import { useState } from "react";

import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setmail] = useState("");
  function onchange(e) {
    setmail(e.target.value);
  }
  function handleClick() {
    console.log(email);
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
          <form action="">
            <p className="text-bold">
              An OTP will be sent to your registered email ID
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
              GET OTP
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
