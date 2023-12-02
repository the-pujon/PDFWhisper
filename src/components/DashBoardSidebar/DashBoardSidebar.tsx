"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";
import {
  FaRegFilePdf,
  FaRegQuestionCircle,
  FaRegUserCircle,
} from "react-icons/fa";
import { MdOutlineContactMail, MdOutlineFeedback } from "react-icons/md";
//import { FaRegCircleQuestion } from "react-icons/fa6";

const DashBoardSidebar = () => {
  const pathName = usePathname();

  return (
    <>
      <div className="flex flex-col items-center w-16 h-[100vh] z-10 overflow-hidden text-gray-700  bg-white/30 backdrop-blur-2xl sm:hidden">
        <div className="flex flex-col items-center mt-3">
          <Link
            className={`flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-primary hover:text-white transition-all duration-300 ${
              pathName == "/dashboard" ? "bg-primary text-white" : ""
            }`}
            href="/dashboard"
          >
            <FaRegFilePdf className="text-xl" />
          </Link>
          <Link
            className={`flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-primary hover:text-white transition-all duration-300 ${
              pathName == "/dashboard/manageFAQs" ? "bg-primary text-white" : ""
            }`}
            href="/dashboard/manageFAQs"
          >
            {" "}
            <FaRegQuestionCircle className="text-xl" />
          </Link>

          <Link
            className={`flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-primary hover:text-white transition-all duration-300 ${
              pathName == "/dashboard/manageUsers"
                ? "bg-primary text-white"
                : ""
            }`}
            href="/dashboard/manageUsers"
          >
            <FaRegUserCircle className="text-xl" />
          </Link>

          <Link
            className={`flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-primary hover:text-white transition-all duration-300 ${
              pathName == "/dashboard/manageContactInfo"
                ? "bg-primary text-white"
                : ""
            }`}
            href="/dashboard/manageContactInfo"
          >
            <MdOutlineContactMail className="text-xl" />
          </Link>

          <Link
            className={`flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-primary hover:text-white transition-all duration-300 ${
              pathName == "/dashboard/manageFeedback"
                ? "bg-primary text-white"
                : ""
            }`}
            href="/dashboard/manageFeedback"
          >
            <MdOutlineFeedback className="text-xl" />
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
      <div className="md:flex flex-col items-center w-60  h-[100vh] overflow-hidden rounded divide-x hidden  bg-white/30 backdrop-blur-2xl ">
        <div className="w-full ">
          <div className="flex flex-col items-center w-full ">
            <Link
              className={`flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-primary hover:text-white transition-all duration-300 ${
                pathName == "/dashboard" ? "bg-primary text-white" : ""
              }`}
              href="/dashboard"
            >
              <FaRegFilePdf className="text-xl" />
              <span className="ml-2 text-sm font-medium"> My Files</span>
            </Link>
            <Link
              className={`flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-primary hover:text-white transition-all duration-300 ${
                pathName == "/dashboard/manageFAQs"
                  ? "bg-primary text-white"
                  : ""
              }`}
              href="/dashboard/manageFAQs"
            >
              {" "}
              <FaRegQuestionCircle className="text-xl" />
              <span className="ml-2 text-sm font-medium">Manage FAQs</span>
            </Link>

            <Link
              className={`flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-primary hover:text-white transition-all duration-300 ${
                pathName == "/dashboard/manageUsers"
                  ? "bg-primary text-white"
                  : ""
              }`}
              href="/dashboard/manageUsers"
            >
              <FaRegUserCircle className="text-xl" />
              <span className="ml-2 text-sm font-medium">Manage Users</span>
            </Link>

            <Link
              className={`flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-primary hover:text-white transition-all duration-300 ${
                pathName == "/dashboard/manageContactInfo"
                  ? "bg-primary text-white"
                  : ""
              }`}
              href="/dashboard/manageContactInfo"
            >
              <MdOutlineContactMail className="text-xl" />
              <span className="ml-2 text-sm font-medium">
                Manage Contact Info
              </span>
            </Link>

            <Link
              className={`flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-primary hover:text-white transition-all duration-300 ${
                pathName == "/dashboard/manageFeedback"
                  ? "bg-primary text-white"
                  : ""
              }`}
              href="/dashboard/manageFeedback"
            >
              <MdOutlineFeedback className="text-xl" />
              <span className="ml-2 text-sm font-medium">Manage Feedback</span>
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
