import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { FaFileUpload, FaRegFilePdf } from "react-icons/fa";
import { Progress } from "../ui/progress";
import { FiLoader } from "react-icons/fi";
import { AiOutlineFileDone } from "react-icons/ai";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "../ui/use-toast";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const UploadPDF = ({ isSubscribed }: { isSubscribed: boolean }) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  //const [uploadedFileSize, setUploadedFileSize] = useState<number>(0);
  const { toast } = useToast();
  const router = useRouter();

  //const { startUpload } = useUploadThing("pdfUploader");
  const { startUpload } = useUploadThing(
    isSubscribed ? "proPlanUploader" : "freePlanUploader"
  );

  //const { mutate: getPDFFile } = trpc.getFile.useMutation({
  //  onSuccess: (file) => {
  //    router.push(`/dashboard/${file.id}`);
  //  },
  //  retry: true,
  //  retryDelay: 500,
  //});

  const showProgress = () => {
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 500);
    return interval;
  };

  return (
    <div>
      <Dropzone
        onDrop={async (acceptedFiles) => {
          setIsUploading(true);

          const fileSize = parseFloat(
            (acceptedFiles[0].size / 1024).toFixed(2)
          );

          const progress = showProgress();

          try {
            const response = await startUpload(acceptedFiles);

            if (!response) {
              toast({
                variant: "destructive",
                action: (
                  <div className="w-full">
                    {fileSize > 2 && !isSubscribed ? (
                      <div className="w-full flex justify-between items-center text-sm">
                        <span>
                          Our Free plan does not support pdf more then 2MB and 2
                          page. Please Upload less then 2MB and 2 page
                        </span>
                        <Link
                          href="/dashboard/billing"
                          className="px-2 py-1 border border-white rounded-xl text-sm"
                        >
                          Upgrade
                        </Link>
                      </div>
                    ) : fileSize > 4 && isSubscribed ? (
                      <div className="w-full flex justify-between items-center text-sm">
                        <span>
                          Our Pro plan does not support pdf more then 4MB and 10
                          Page. Please Upload less then 4MB and 4 page
                        </span>
                        <Link
                          href="/dashboard/billing"
                          className="px-2 py-1 border border-white rounded-xl text-sm"
                        >
                          Upgrade
                        </Link>
                      </div>
                    ) : (
                      "Please try again"
                    )}
                  </div>
                ),
              });
              return;
            }

            const fileResponse = Array.isArray(response) ? response[0] : null;
            const key = fileResponse?.key;

            clearInterval(progress);
            setUploadProgress(100);

            if (key) {
              window.location.reload();
            } else {
              toast({
                variant: "destructive",
                title: "File key not found.",
                description: "Please try again later or with another file.",
              });
            }
          } catch (error) {
            toast({
              variant: "destructive",
              title: "Something went wrong",
            });
          }
        }}
      >
        {({ acceptedFiles, getInputProps, getRootProps }) => (
          <div
            {...getRootProps()}
            className={` m-3 border border-dotted   rounded-sm  h-56`}
          >
            <div
              className={`flex items-center justify-center flex-col w-full h-full gap-4`}
            >
              <label
                htmlFor="file"
                className={`flex items-center justify-center flex-col gap-3 ${
                  isUploading && "hidden"
                }`}
              >
                <FaFileUpload className="text-3xl text-primary" />
                <p>
                  <b className="text-primary">Upload PDF</b> or Drag and drop
                  pdf here
                </p>

                {/*<input type="file" id='file' className=" " {...getInputProps()} />*/}
              </label>
              {isUploading ? (
                <div className="w-full mt-4 max-w-xs mx-auto">
                  {uploadProgress < 100 ? (
                    <>
                      {" "}
                      <div className="flex gap-1 items-center justify-center text-sm text-zinc-700 text-center pb-5">
                        <FiLoader
                          className={`text-5xl text-primary animate-spin`}
                        />
                      </div>
                      {acceptedFiles && acceptedFiles[0] && (
                        <div
                          className={`max-w-xs bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200  `}
                        >
                          <div className="px-3 py-2 h-full grid place-items-center">
                            <FaRegFilePdf className="text-3xl" />
                          </div>
                          <div className="px-3 py-2 h-full text-sm truncate">
                            {acceptedFiles[0].name}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {" "}
                      <div className="flex gap-1 items-center justify-center text-sm text-zinc-700 text-center pb-5">
                        <AiOutlineFileDone
                          className={`text-5xl text-primary`}
                        />
                      </div>
                      {acceptedFiles && acceptedFiles[0] && (
                        <div
                          className={`max-w-xs bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200  `}
                        >
                          <div className="px-3 py-2 h-full grid place-items-center">
                            <FaRegFilePdf className="text-3xl" />
                          </div>
                          <div className="px-3 py-2 h-full text-sm truncate">
                            {acceptedFiles[0].name}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  <Progress
                    value={uploadProgress}
                    className="h-1 w-full bg-zinc-200"
                  />
                  {uploadProgress === 100 ? (
                    <div className="flex gap-1 items-center justify-center text-sm text-zinc-700 text-center pt-2">
                      <FiLoader
                        className={`text-2xl text-primary animate-spin`}
                      />
                      Redirecting...
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default UploadPDF;
