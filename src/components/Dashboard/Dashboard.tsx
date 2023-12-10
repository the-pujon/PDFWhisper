"use client";

import { trpc } from "@/app/_trpc/client";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Button } from "../ui/button";
import { format } from "date-fns";
import Link from "next/link";
import UploadButton from "../UploadButton/UploadButton";
import { FaPlus, FaRegFilePdf, FaRegTrashAlt } from "react-icons/fa";
import { HiChatAlt2 } from "react-icons/hi";
import { FiLoader } from "react-icons/fi";
import { useToast } from "../ui/use-toast";
import { INFINITE_QUERY_LIMIT } from "@/config/infinite-query";
import LatestMsg from "../LatestMsg/LatestMsg";
import { MdOutlineUpdate } from "react-icons/md";
import { getUserSubscriptionPlan } from "@/lib/stripe";

interface DashboardProps {
  subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>;
}

const Dashboard = ({ subscriptionPlan }: DashboardProps) => {

  const [currentlyDeletingFile, setCurrentlyDeletingFile] = useState<string | null>(null);

  const utils = trpc.useContext();
  const { toast } = useToast();

  const { data: files, isLoading } = trpc.getUserFiles.useQuery();

  const { mutate: deleteFile } = trpc.deleteFile.useMutation({
    onSuccess: () => {
      utils.getUserFiles.invalidate();
      toast({
        variant: "destructive",
        title: "Deleted Successfully",
      });
    },
    onMutate({ id }) {
      setCurrentlyDeletingFile(id);
    },
    onSettled() {
      setCurrentlyDeletingFile(null);
    },
  });

  return (
    <main className="mx-auto p-4 w-full max-w-7xl min-h-screen overflow-ellipsis md:p-10">
      <div className=" sm:mt-8 w-full flex flex-col items-start justify-between gap-4 sm:border-b border-gray-200 sm:pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-4xl sm:text-5xl text-gray-900">
          My PDF Files
        </h1>

        <UploadButton isSubscribed={subscriptionPlan.isSubscribed} />
      </div>

      {/* display all user files */}
      {files && files?.length !== 0 ? (
        <ul className="mt-8 pb-10 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
          {files
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((file) => (
              <li
                key={file.id}
                className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white/30 backdrop-blur-2xl shadow-md transition hover:shadow-lg "
              >
                <div className="px-6 flex justify-end py-2 gap-6 text-xs text-zinc-500">
                  <div className="flex items-center gap-2">
                    <MdOutlineUpdate />

                    {format(new Date(file.createdAt), "dd MMM yyyy")}
                  </div>
                </div>

                <Link
                  href={`/dashboard/${file.id}`}
                  className="flex flex-col gap-2"
                >
                  <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                    <div className=" flex item-center justify-center">
                      <FaRegFilePdf className="text-2xl" />
                    </div>
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className="truncate text-lg font-medium text-zinc-900">
                          {file.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="px-6 mt-4 flex justify-between place-items-center py-2 gap-6 text-xs text-zinc-500">
                  <div className="flex items-center gap-2">
                    <HiChatAlt2 className="text-xl" />
                    <LatestMsg fileId={file.id} />
                  </div>

                  <Button
                    onClick={() => deleteFile({ id: file.id })}
                    size="sm"
                    className="w-fit"
                    variant="destructive"
                  >
                    {currentlyDeletingFile === file.id ? (
                      <FiLoader className={` animate-spin`} />
                    ) : (
                      <FaRegTrashAlt className="text-xl" />
                    )}
                  </Button>
                </div>
              </li>
            ))}
        </ul>
      ) : isLoading ? (
        <Skeleton height={100} className="my-2" count={3} />
      ) : (
        <div className="mt-16 flex flex-col items-center gap-2">
          <h3 className="font-semibold text-xl">Pretty empty around here</h3>
          <p>Let&apos;s upload your first PDF.</p>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
