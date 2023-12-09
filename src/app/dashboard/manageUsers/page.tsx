import ManageUsers from "@/components/ManageUsers/ManageUsers";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
import { redirect } from "next/navigation";
import { db } from "@/db";

const Page = async () => {

  const { getUser } = getKindeServerSession();
  const user = getUser();

  if (!user || !user.id) redirect("/auth-callback?origin=dashboard/manageUsers");

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });
  if (!dbUser) redirect("/auth-callback?origin=dashboard/manageUsers");

  return <div><ManageUsers/></div>;
};

export default Page;
