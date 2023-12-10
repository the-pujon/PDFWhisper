"use client";

import DashBoardSidebar from "@/components/DashBoardSidebar/DashBoardSidebar";
import React from "react";
import { trpc } from "../_trpc/client";
import { useParams } from "next/navigation";


const DashLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: isAdmin } = trpc.user.getAdmin.useQuery();

  const params = useParams()

  return (
    <div className="flex justify-between w-full ">
      <div className="">
        {isAdmin?.role === "admin" && !params?.fileid ? <DashBoardSidebar /> : <></>}
      </div>

      <>
        <div className="relative isolate -z-10">
          <div
            aria-hidden="true"
            className="pointer-events-none fixed w-full -translate-x-52 -z-10 overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{ clipPath: "circle(50% at 50% 50%)" }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem]  -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-transparent opacity-50 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none fixed w-full translate-y-[90vh]   translate-x-14  -z-10   overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{ clipPath: "circle(50% at 50% 50%)" }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem]  translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-transparent opacity-50 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>
      </>
      <div className="flex-1 w-full mt-16 sm:mt-8 min-h-screen overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default DashLayout;
