import DashBoardSidebar from "@/components/DashBoardSidebar/DashBoardSidebar";
import Link from "next/link";
import React from "react";

const DashLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-between w-full h-[95vh] divide-x">
      <DashBoardSidebar />
      <>
        <div className="relative isolate">
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
      <div className="w-full">{children}</div>
    </div>
  );
};

export default DashLayout;
