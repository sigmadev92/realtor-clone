import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [showPass, setShowPass] = useState(true);

  const { email, password, name } = formData;

  function onchange(e) {
    const field = e.target.id;
    console.log(e.target.value);
    setData((prevStat) => ({
      ...prevStat,
      [e.target.id]: e.target.value,
    }));
  }
  function handleClick() {
    setShowPass((prev) => !prev);
  }
  const navigate = useNavigate();
  return (
    <section>
      <h1 className="text-center mt-6 text-2xl font-bold">Sign Up</h1>
      <div className="flex flex-wrap justify-center mt-6">
        <div>
          <img
            src="https://plus.unsplash.com/premium_photo-1679857930663-e7c840a031ec?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8a2V5fGVufDB8fDB8fHww"
            alt="a key"
            className="h-[400px] rounded-2xl"
          />
        </div>
        <div className="h-100 sm:w-0 md:w-[1px] bg-black mx-[20px]" />
        <div className="  w-[350px] py-[20px]">
          <form action="">
            <input
              type="text"
              className="w-full mb-[20px] h-8 px-2 mt-3 text-red-500"
              placeholder="enter your name"
              required
              id="name"
              value={name}
              onChange={onchange}
            />
            <input
              type="email"
              className="w-full mb-[30px] h-8 px-2 mt-3 text-red-500"
              placeholder="enter your email"
              required
              id="email"
              value={email}
              onChange={onchange}
            />
            <div className="flex">
              <input
                type={showPass ? "text" : "password"}
                className="w-[90%] mb-[30px] h-8 px-2"
                placeholder="enter your password"
                required
                id="password"
                value={password}
                onChange={onchange}
              />
              <img
                src="https://cdn5.vectorstock.com/i/1000x1000/82/39/eye-icon-vector-30058239.jpg"
                alt="icon"
                className="h-8 cursor-pointer"
                onClick={handleClick}
              />
            </div>
            <div className="flex text-sm justify-between mb-3">
              <p>
                Already have an account?
                <Link
                  to={"/sign-in"}
                  className="text-red-900 cursor-pointer hover:text-blue-400"
                >
                  {" "}
                  Sign In
                </Link>
              </p>
              <Link
                to="/forgot-password"
                className="text-blue-600 cursor-pointer"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="mb-[10px] bg-red-400 w-full py-2 hover:bg-white rounded-xl"
            >
              SUBMIT
            </button>
          </form>
          <div className="flex">
            <div className="h-[1px] bg-black w-full mt-3"></div>
            <p className="text-center text-bold mx-2">OR</p>
            <div className="h-[1px] bg-black w-full mt-3"></div>
          </div>
          <OAuth />
        </div>
      </div>
    </section>
  );
}
