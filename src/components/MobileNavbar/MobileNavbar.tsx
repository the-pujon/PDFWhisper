"use client";

import { getUserSubscriptionPlan } from "@/lib/stripe";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowRight, Gem, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { FaUser } from "react-icons/fa";

const MobileNav = ({
  isAuth,
  email,
  imageUrl,
  name,
  isSubscribed,
}: {
  isAuth: boolean;
  email: string | undefined;
  name: string;
  imageUrl: string;
  isSubscribed: boolean;
}) => {
  const [isOpen, setOpen] = useState<boolean>(false); // for controlling the mobile menu's open/close state

  //for toggle the mobile menu's open/close state
  const toggleOpen = () => setOpen((prev) => !prev);

  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) toggleOpen();
  }, [pathname]);

  // for close the mobile menu when the current page is selected
  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      toggleOpen();
    }
  };

  return (
    <div className="sm:hidden">
      <Menu
        onClick={toggleOpen}
        className="relative z-50 h-5 w-5 text-zinc-700"
      />

      {isOpen ? (
        <div className="fixed animate-in slide-in-from-top-5 fade-in-20 inset-0 z-0">
          <ul className="absolute bg-white border-b border-zinc-200 right-10 drop-shadow-2xl py-3 grid w-fit gap-1 rounded-md px-5 top-14">
            {!isAuth ? (
              <div className="flex flex-col divide-y gap-2">
                <li>
                  <Link
                    onClick={() => closeOnCurrent("/sign-up")}
                    className="flex items-center w-full pt-2 font-semibold text-primary"
                    href="/sign-up"
                  >
                    Get started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </li>

                <li>
                  <Link
                    onClick={() => closeOnCurrent("/sign-in")}
                    className="flex pt-2 items-center w-full font-semibold"
                    href="/sign-in"
                  >
                    Sign in
                  </Link>
                </li>

                <li>
                  <Link
                    onClick={() => closeOnCurrent("/pricing")}
                    className="flex items-center w-full font-semibold pt-2"
                    href="/pricing"
                  >
                    Pricing
                  </Link>
                </li>
              </div>
            ) : (
              <div className="flex flex-col divide-y gap-2">
                <li className="flex items-center justify-start gap-2 p-2">
                  <Avatar className="relative w-8 h-8">
                    {imageUrl ? (
                      <div className="relative aspect-square h-full w-full">
                        <Image
                          fill
                          src={imageUrl}
                          alt="profile picture"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ) : (
                      <AvatarFallback>
                        <span className="sr-only">{name}</span>
                        <FaUser className="h-4 w-4 text-zinc-900" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex flex-col space-y-0.5 leading-none">
                    {name && (
                      <p className="font-medium text-sm text-black">{name}</p>
                    )}
                    {email && (
                      <p className="w-[200px] truncate text-xs text-zinc-700">
                        {email}
                      </p>
                    )}
                  </div>
                </li>
                <li className="pt-2">
                  <Link href="/dashboard">Dashboard</Link>
                </li>

                <li className="pt-2">
                  <div>
                    {isSubscribed ? (
                      <Link href="/dashboard/billing">Manage Subscription</Link>
                    ) : (
                      <Link href="/pricing" className="flex items-center gap-2">
                        Upgrade <Gem className="text-blue-600 h-4 w-4 ml-1.5" />
                      </Link>
                    )}
                  </div>
                </li>

                <li className="pt-2">
                  <LogoutLink>Log out</LogoutLink>
                </li>
              </div>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default MobileNav;
