"use client";

import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaFacebook, FaFacebookSquare, FaGithubSquare, FaInstagramSquare } from "react-icons/fa";

export const Footer = () => {
  const pathName = usePathname();

  if (pathName !== "/") return;

  return (
    <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <a
            href="/"
            aria-label="Go home"
            title="Company"
            className="inline-flex items-center"
          >
            <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
            <Image
                    src="/logo2.png"
                    alt="product preview"
                    width={250}
                    height={10}
                    quality={100}

                  />
            </span>
          </a>
          <div className="mt-6 lg:max-w-sm">
            <p className="text-sm text-gray-800">
              Empower your PDF experience with PDFWhisper. Seamlessly chat with
              your documents, gain insights, and simplify your workflow
              effortlessly
            </p>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <p className="text-base font-bold tracking-wide text-gray-900">
            Contacts
          </p>
          <div className="flex">
            <p className="mr-1 text-gray-800">Phone:</p>
            <a
              href="tel:+880-1789-173903"
              aria-label="Our phone"
              title="Our phone"
              className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
            >
              +880-1789-173903
            </a>
          </div>
          <div className="flex">
            <p className="mr-1 text-gray-800">Email:</p>
            <a
              href="mailto:auvipujondas@gmail.com"
              aria-label="Our email"
              title="Our email"
              className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
            >
              auvipujondas@gmail.com
            </a>
          </div>
          <div className="flex">
            <p className="mr-1 text-gray-800">Address:</p>
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Our address"
              title="Our address"
              className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
            >
              Mirpur-10, Dhaka
            </a>
          </div>
        </div>
        <div>
          <span className="text-base font-bold tracking-wide text-gray-900">
            Social
          </span>
          <div className="flex items-center mt-1 space-x-3">
            <Link href='https://www.facebook.com/pujon.pujon.7' className="text-2xl" ><FaFacebookSquare/></Link>
            <Link href='https://github.com/the-pujon' className="text-2xl" ><FaGithubSquare/></Link>
            <Link href='https://www.instagram.com/pujon_das_auvi36/?next=%2F&hl=en' className="text-2xl" ><FaInstagramSquare/></Link>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Connect with PDFWhisper: Elevate your PDF interactions. Follow us
            for updates, tips, and transformative insights.
          </p>
        </div>
      </div>
      <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
        <p className="text-sm text-gray-600">
          © Copyright {format(new Date(), "yyyy")} PDFWhisper. All rights
          reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
