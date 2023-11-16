import Dashboard from "@/components/Dashboard/Dashboard";
import WidthWrapper from "@/components/WidthWrapper/WidthWrapper";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
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
    <>
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
      <Dashboard />
    </>
  );
};

export default Page;
