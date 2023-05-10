import React from "react";

function FeedBack() {
  return (
    <form className="max-w-[700px] mx-auto p-5 flex flex-col ">
      <h1 className="md:text-3xl text-xl">Leave a feedback</h1>
      <textarea
        className="bg-input w-full p-3 text-md mt-2 rounded min-h-[200px] outline-none text-lblack resize-none"
        placeholder="Write to us..."
      ></textarea>
      <button
        disabled
        className="bg-red rounded-full p-3 text-lg text-white w-full max-w-[150px] mt-5 ml-auto hover:scale-[98%]"
      >
        Send
      </button>
    </form>
  );
}

export default FeedBack;
