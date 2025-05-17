import React from "react";

const Navbar = () => {
  return (
    <div className=" 2xl:container 2xl:mx-auto border-b-2 border-red-500 px-8 py-4 bg-black/30">
      <div>
        <a href="#" className="cursor-pointer font-semibold text-xl">
          <span className="text-blue-500">Medi</span>Track
        </a>
      </div>
    </div>
  );
};

export default Navbar;
