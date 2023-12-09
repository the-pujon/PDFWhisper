import ManageFeedback from "@/components/ManageFeedback/ManageFeedback";
import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/db";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  if (!user || !user.id) redirect("/auth-callback?origin=dashboard/manageFeedback");

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });
  if (!dbUser) redirect("/auth-callback?origin=dashboard/manageFeedback");

  return (
    <div>
      <ManageFeedback />
    </div>
  );
};

export default Page;
