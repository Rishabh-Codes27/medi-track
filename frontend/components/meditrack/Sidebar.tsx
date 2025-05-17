"use client";

import { useState } from "react";
import { SquareMenu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const features = [
    { title: "Calendar", link: "/medi-track/calendar-view" },
    {
      title: "Upload prescription",
      link: "/medi-track/prescription-upload",
    },
  ];

  return (
    <>
      {/* Mobile Menu Icon (fixed top-left) */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <SquareMenu
          className="cursor-pointer bg-gray-200 p-2 rounded shadow"
          onClick={toggleSidebar}
        />
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 h-screen bg-gray-200 w-2/3 sm:w-1/2 md:w-2/6 rounded-r-lg shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:shadow-none md:flex md:flex-col`}
      >
        {/* Sidebar Header */}
        <div className="w-full border-b-2 px-6 py-4 flex items-center justify-center text-xl font-semibold">
          <a href="/medi-track">
            <p>
              <span className="text-blue-500">Medi</span>Track
            </p>
          </a>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 w-full flex flex-col items-center justify-between py-4">
          {/* adding links to features */}

          <div className="flex flex-col rounded-xl w-6/6 px-4 py-2">
            {features.map((feature, id) => (
              <a
                href={feature.link}
                key={id}
                className="cursor-pointer  h-full hover:bg-black/30 w-5/6 rounded-xl mb-2 px-4 py-2 transition-colors duration-200"
              >
                {" "}
                {feature.title}{" "}
              </a>
            ))}
          </div>

          <div className="border- w-5/6  rounded-xl mb-5 px-4 py-2 bg-black/30">
            <div className="">
              <Avatar className="mb-2">
                <AvatarFallback>RD</AvatarFallback>
              </Avatar>
              <Skeleton className="w-4/6 h-[20px] rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
