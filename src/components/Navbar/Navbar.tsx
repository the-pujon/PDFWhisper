import Link from "next/link";
import MaxWidthWrapper from "../WidthWrapper/WidthWrapper";
import { buttonVariants } from "../ui/button";
import {
  LoginLink,
  RegisterLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowRight } from "lucide-react";
import UserAccountNav from "../UserAccountNav/UserAccountNav";
import MobileNav from "../MobileNavbar/MobileNavbar";
import { getUserSubscriptionPlan } from "@/lib/stripe";

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  const subscriptionPlan = await getUserSubscriptionPlan();

  return (
    <nav className="fixed h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            <span>PDFWhishper.</span>
          </Link>
          {/* mobile responsive navbar component */}
          <MobileNav
            isSubscribed={subscriptionPlan?.isSubscribed}
            isAuth={!!user}
            name={
              !user?.given_name || !user?.family_name
                ? "Your Account"
                : `${user.given_name} ${user.family_name}`
            }
            email={user?.email ?? ""}
            imageUrl={user?.picture ?? ""}
          />

          <div className="hidden items-center space-x-4 sm:flex">
            {!user ? (
              <>
                <Link
                  href="/pricing"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Pricing
                </Link>
                <LoginLink
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Sign in
                </LoginLink>
                <RegisterLink
                  className={buttonVariants({
                    size: "sm",
                  })}
                >
                  Get started <ArrowRight className="ml-1.5 h-5 w-5" />
                </RegisterLink>
              </>
            ) : (
              <>
               <Link
                  href="/pricing"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Pricing
                </Link>
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Dashboard
                </Link>

                {/* showing about user */}
                <UserAccountNav
                  isSubscribed={subscriptionPlan?.isSubscribed}
                  name={
                    !user?.given_name || !user?.family_name
                      ? "Your Account"
                      : `${user.given_name} ${user.family_name}`
                  }
                  email={user.email ?? ""}
                  imageUrl={user.picture ?? ""}
                />
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
