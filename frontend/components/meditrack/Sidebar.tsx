// "use client";

// import { useState } from "react";
// import { SquareMenu } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import { Skeleton } from "../ui/skeleton";

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggleSidebar = () => setIsOpen(!isOpen);

//   const features = [
//     { title: "Calendar", link: "/medi-track/calendar-view" },
//     {
//       title: "Upload prescription",
//       link: "/medi-track/prescription-upload",
//     },
//   ];

//   return (
//     <>
//       {/* Mobile Menu Icon (fixed top-left) */}
//       <div className="md:hidden fixed top-4 left-4 z-50">
//         <SquareMenu
//           className="cursor-pointer bg-gray-200 p-2 rounded shadow"
//           onClick={toggleSidebar}
//         />
//       </div>

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 z-40 h-screen bg-gray-200 w-2/3 sm:w-1/2 md:w-2/6 rounded-r-lg shadow-lg transform transition-transform duration-300 ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0 md:relative md:shadow-none md:flex md:flex-col`}
//       >
//         {/* Sidebar Header */}
//         <div className="w-full border-b-2 px-6 py-4 flex items-center justify-center text-xl font-semibold">
//           <a href="/medi-track">
//             <p>
//               <span className="text-blue-500">Medi</span>Track
//             </p>
//           </a>
//         </div>

//         {/* Sidebar Content */}
//         <div className="flex-1 w-full flex flex-col items-center justify-between py-4">
//           {/* adding links to features */}

//           <div className="flex flex-col rounded-xl w-6/6 px-4 py-2">
//             {features.map((feature, id) => (
//               <a
//                 href={feature.link}
//                 key={id}
//                 className="cursor-pointer  h-full hover:bg-black/30 w-5/6 rounded-xl mb-2 px-4 py-2 transition-colors duration-200"
//               >
//                 {" "}
//                 {feature.title}{" "}
//               </a>
//             ))}
//           </div>

//           <div className="border- w-5/6  rounded-xl mb-5 px-4 py-2 bg-black/30">
//             <div className="">
//               <a href="/medi-track/account">
//                 <Avatar className="mb-2">
//                   <AvatarFallback>RD</AvatarFallback>
//                 </Avatar>
//               </a>
//               <Skeleton className="w-4/6 h-[20px] rounded-full" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Overlay for mobile */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
//           onClick={toggleSidebar}
//         />
//       )}
//     </>
//   );
// };

// export default Sidebar;


'use client';

import { useState } from 'react';
import { SquareMenu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const features = [
    { title: 'Dashboard', link: '/medi-track' },
    { title: 'Calendar', link: '/medi-track/calendar-view' },
    { title: 'Upload Prescription', link: '/medi-track/prescription-upload' },
    { title: 'Account', link: '/medi-track/account' },
  ];

  return (
    <>
      {/* Mobile Menu Icon */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <SquareMenu
          className="cursor-pointer bg-white text-gray-700 p-2 rounded shadow-lg"
          size={28}
          onClick={toggleSidebar}
        />
      </div>

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 left-0 z-40 h-screen bg-blue-50 w-3/4 sm:w-2/5 md:w-64 rounded-r-2xl shadow-lg transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 md:relative md:flex md:flex-col`}
      >
        {/* Header */}
        <div className="w-full border-b px-6 py-5 flex items-center justify-center text-xl font-bold">
          <Link href="/medi-track">
            <span className="text-blue-600">Medi</span>Track
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 w-full px-4 py-6 space-y-2">
          {features.map((item, idx) => (
            <Link
              key={idx}
              href={item.link}
              className="block w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-blue-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.title}
            </Link>
          ))}
        </div>

        {/* Footer - Avatar */}
        <div className="border-t px-4 py-4 bg-blue-100">
          <Link href="/medi-track/account" className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="" alt="User" />
              <AvatarFallback>RD</AvatarFallback>
            </Avatar>
            <Skeleton className="w-3/4 h-4 rounded bg-blue-200" />
          </Link>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
