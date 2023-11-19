import React from "react";
import AddFAQs from "../AddFAQs/AddFAQs";

const ManageFAQs = () => {
  return (
    <div className="flex w-full h-screen divide-x">
      <div className="flex-1">
        <AddFAQs />
      </div>
      <div className="flex-1">Show, Update, Delete FAQs</div>
    </div>
  );
};

export default ManageFAQs;
