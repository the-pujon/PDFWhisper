import Dashboard from "@/components/Dashboard/Dashboard";
import WidthWrapper from "@/components/WidthWrapper/WidthWrapper";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  if (!user || !user.id) redirect("/auth-callback?origin=dashboard");

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });
  if (!dbUser) redirect("/auth-callback?origin=dashboard");

  return (
    <div>
      <div className="flex justify-between w-full h-[95vh] divide-x">
        {/*<!-- Component Start -->*/}

        {/*<!-- Component End  -->*/}

        {/*<!-- Component Start -->*/}

        <Dashboard />
      </div>

      {/* background */}

      {/*<Dashboard />*/}
    </div>
  );
};

export default Page;
