import React from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };
  return (
    <div className="bg-gray-500 m-5 flex flex-col  text-white rounded-4xl p-5 overflow-auto text-center">
      <div className="flex flex-col text-3xl items-center   my-3 font-bold ">
        <h1 className=" w-60">AND SMART- TRANSACTS</h1>
      </div>
      <div className="mb-5">
        just link your M-WALLET and smart-transacts accounts and enjoy a world
        of possibilities
      </div>
      <div className="mb-5">
        Track The Payment Transfer To Check The Status Of Your Payment.
      </div>
      <div className="mb-5">
        <button
          onClick={handleClick}
          className="p-5 bg-amber-200 text-black font-bold py-3 rounded-4xl w-full"
        >
          {" "}
          Track Payment
        </button>
      </div>
      <div className="mb-5">
        Accept The Payment To Receive The Funds Instantly.
      </div>
      <div className="mb-5">
        <button
          onClick={handleClick}
          className="bg-blue-500 p-5 py-3 rounded-4xl font-bold w-full"
        >
          {" "}
          Accept Payment
        </button>
      </div>{" "}
      <div className="mb-5">
        Cancel The Payment To Decline The Funds,And The Sender Will Be Refunded
        Immidietly.
      </div>
      <div className="mb-5">
        <button
          onClick={handleClick}
          className="bg-pink-500 p-5 py-3 rounded-4xl font-bold w-full"
        >
          {" "}
          Cancel The Transfer
        </button>
      </div>
    </div>
  );
}

export default Landing;
