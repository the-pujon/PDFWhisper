import DashBoardSidebar from "@/components/DashBoardSidebar/DashBoardSidebar";
import Link from "next/link";
import React from "react";

const DashLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-between w-full h-[95vh] divide-x">
      <DashBoardSidebar />

      <div className="w-full">{children}</div>
    </div>
  );
};

export default DashLayout;
