import Link from "next/link";
import React from "react";
import {
  FaRegFilePdf,
  FaRegQuestionCircle,
  FaRegUserCircle,
} from "react-icons/fa";
//import { FaRegCircleQuestion } from "react-icons/fa6";

const DashBoardSidebar = () => {
  return (
    <>
      <div className="flex flex-col items-center w-16 h-full overflow-hidden text-gray-700 bg-gray-100 rounded sm:hidden">
        <div className="flex flex-col items-center mt-3">
          <Link
            className="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-300"
            href="#"
          >
            <FaRegFilePdf />
          </Link>
          <Link
            className="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-300"
            href="#"
          >
            <FaRegQuestionCircle />
          </Link>

          <Link
            className="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-300"
            href="#"
          >
            <FaRegUserCircle />
          </Link>
        </div>

        <Link
          className="flex items-center justify-center w-16 h-16 mt-auto bg-gray-200 hover:bg-gray-300"
          href="#"
        >
          A
        </Link>
      </div>

      {/* Big screen */}
      <div className="md:flex flex-col items-center w-60 h-full overflow-hidden rounded divide-x hidden  ">
        <div className="w-full ">
          <div className="flex flex-col items-center w-full ">
            <Link
              className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300"
              href="#"
            >
              <FaRegFilePdf />
              <span className="ml-2 text-sm font-medium"> My Files</span>
            </Link>
            <a
              className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300"
              href="#"
            >   <FaRegQuestionCircle />
              <span className="ml-2 text-sm font-medium">Manage FAQs</span>
            </a>

            <Link
              className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300"
              href="/dashboard/manageUsers"
            >
                 <FaRegUserCircle />
              <span className="ml-2 text-sm font-medium">Manage Users</span>
            </Link>
          </div>
        </div>
        <a
          className="flex items-center justify-center w-full h-16 mt-auto bg-gray-200 hover:bg-gray-300"
          href="#"
        >
          <span className="ml-2 text-sm font-medium">Account</span>
        </a>
      </div>
    </>
  );
};

export default DashBoardSidebar;
