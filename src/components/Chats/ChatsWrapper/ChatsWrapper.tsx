"use client";

import React from "react";
import Messages from "../Messages/Messages";
import InputMessage from "../InputMessage/InputMessage";
import { trpc } from "@/app/_trpc/client";
import { Loader2 } from "lucide-react";
import { FiLoader } from "react-icons/fi";
import Link from "next/link";
import {
  AiOutlineCloseCircle,
  AiOutlineDoubleLeft,
  AiOutlineLeft,
} from "react-icons/ai";
import { buttonVariants } from "@/components/ui/button";
import { ChatProvider } from "../ChatProvider/ChatProvider";

interface ChatsWrapperProps {
  fileId: string;
}

const ChatsWrapper = ({ fileId }: ChatsWrapperProps) => {
  const { data, isLoading } = trpc.getFileUploadStatus.useQuery(
    { fileId },
    {
      refetchInterval: (data) =>
        data?.status === "SUCCESS" || data?.status === "FAILED" ? false : 500,
    }
  );

  if (isLoading) {
    return (
      <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
        <div className="flex-1 flex justify-center items-center flex-col mb-28">
          <div className="flex flex-col items-center gap-2">
            <FiLoader className={`text-3xl text-primary animate-spin`} />
            <h3 className="font-semibold text-xl text-primary">Loading...</h3>
            <p className="text-zinc-500 text-sm">
              We&apos;re preparing your PDF.
            </p>
          </div>
        </div>

        <InputMessage isDisabled />
      </div>
    );
  }

  if (data?.status === "PROCESSING")
    return (
      <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
        <div className="flex-1 flex justify-center items-center flex-col mb-28">
          <div className="flex flex-col items-center gap-2">
            <FiLoader className={`text-4xl text-primary animate-spin`} />
            <h3 className="font-semibold text-xl text-primary animate-pulse">
              Processing your PDF...
            </h3>
            <p className="text-zinc-500 text-sm">This won&apos;t take long.</p>
          </div>
        </div>

        <InputMessage isDisabled />
      </div>
    );

  if (data?.status === "FAILED")
    return (
      <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
        <div className="flex-1 flex justify-center items-center flex-col mb-28">
          <div className="flex flex-col items-center gap-2">
            <AiOutlineCloseCircle className="text-3xl text-red-500" />
            <h3 className="font-semibold text-xl text-d">
              Too many pages in PDF
            </h3>
            <p className="text-zinc-500 text-sm">
              Your plan supports up to pages per PDF.
            </p>
            <Link
              href="/dashboard"
              className={buttonVariants({
                variant: "secondary",
                className: "mt-4",
              })}
            >
              <AiOutlineDoubleLeft className="text-sm" />
              Back
            </Link>
          </div>
        </div>

        <InputMessage isDisabled />
      </div>
    );

  return (
    <ChatProvider fileId={fileId}>
      <div className="relative min-h-full bg-zinc-50 flex flex-col justify-between gap-10">
        <div className="flex-1 justify-between flex flex-col mb-32">
          <Messages fileId={fileId} />
        </div>

        <InputMessage />
      </div>
    </ChatProvider>
  );
};

export default ChatsWrapper;
