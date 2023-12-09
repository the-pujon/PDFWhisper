import ManageContactInfo from "@/components/ManageContactInfo/ManageContactInfo";
import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/db";

const Page = async () => {

  const { getUser } = getKindeServerSession();
  const user = getUser();

  if (!user || !user.id) redirect("/auth-callback?origin=dashboard/manageContactInfo");

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });
  if (!dbUser) redirect("/auth-callback?origin=dashboard/manageContactInfo");

  return (
    <div>
      <ManageContactInfo />
    </div>
  );
};

export default Page;
