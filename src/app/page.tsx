import WidthWrapper from "@/components/WidthWrapper/WidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight,FaFilePdf } from "react-icons/fa";
import { GiArchiveRegister } from "react-icons/gi";
import { HiChatAlt2 } from "react-icons/hi";

export default function Home() {
  return (
    <main>
      <WidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center">
        <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border-gray-200 bg-white animate-bounce px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
          <p className="text-sm font-semibold text-gray-700">
            PDFWhisper is now public
          </p>
        </div>
        <h1 className=" max-w-4xl text-4xl md:text-6xl lg:text-7xl font-bold text-center">
          Unlock the Power of Conversational
          <span className="text-primary"> PDFs!</span>
        </h1>
        <p className="mt-5 max-w-prose text-secondary-foreground/70 sm:text-2xl">
          <span className="text-primary font-normal">PDFWhisper </span>
          Facilitating Dynamic Conversations Inside Your PDFs...
        </p>
        <Link
          className={buttonVariants({
            size: "lg",
            className:
              "text-base mt-10 py-6 bg-foreground hover:animate-out hover:repeat-1",
          })}
          href={`/dashboard`}
          target="_blank"
        >
          Get Start <FaArrowRight className="ml-2 " />
        </Link>
      </WidthWrapper>

      {/* Background and banner image */}
      <div>
        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="pointer-events-none fixed w-full -translate-x-52 -z-10 overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{ clipPath: "circle(50% at 50% 50%)" }}
              className="relative fixed left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem]  -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-transparent opacity-50 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>

          <div>
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
              <div className="mt-16 flow-root sm:mt-24">
                <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                  <Image
                    src="/dashboard-preview.jpg"
                    alt="product preview"
                    width={1364}
                    height={866}
                    quality={100}
                    className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none fixed w-full  translate-y-[90vh] translate-x-14  -z-10   overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{ clipPath: "circle(50% at 50% 50%)" }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem]  translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-transparent opacity-50 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>
      </div>

      <WidthWrapper className="mx-auto mb-32 mt-32   sm:mt-56">
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="mt-2 font-bold text-4xl text-gray-900 sm:text-5xl">
              Start chatting in minutes
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Chatting to your PDF files has never been easier than with PDFWhisper.
            </p>
          </div>
        </div>

        {/* steps */}
        <div className="flex w-full divide-x-2 mx-auto border-y-2">

          {/* step1 */}
          <div className="flex flex-col items-start justify-center py-16 px-[3rem] relative ">
            <span className="flex text-[12rem] font-bold text-primary opacity-50  absolute -z-10 -right-4 ">
              1
            </span>
            <span>
              <GiArchiveRegister className="text-4xl text-primary" />
            </span>
            <p className="text-primary text-2xl ">Sign up for an account</p>
            <p>
              {" "}
              Either starting out with a free plan or choose our{" "}
              <Link
                href="/pricing"
                className="text-blue-700 underline underline-offset-2"
              >
                pro plan
              </Link>
              .
            </p>
            <div className="absolute border-2 p-4 -right-7 bg-white z-10 rounded-full">
              <FaArrowRight />
            </div>
          </div>

          {/* step2 */}
          <div className="flex flex-col items-start justify-center py-16 px-[3rem] relative ">
            <span className="flex text-[12rem] font-bold text-primary opacity-50  absolute -z-10 -right-4 ">
              2
            </span>
            <span>
              <FaFilePdf className="text-4xl text-primary" />
            </span>
            <p className="text-primary text-2xl "> Upload your PDF file</p>
            <p>
              We&apos;ll process your file and make it ready for you to chat
              with.
              .
            </p>
            <div className="absolute border-2 p-4 -right-7 bg-white z-10 rounded-full">
              <FaArrowRight />
            </div>
          </div>{" "}

          {/* step3 */}
          <div className="flex flex-col items-start justify-center py-16 px-[3rem] relative">
            <span className="flex text-[12rem] font-bold text-primary opacity-50  absolute -z-10 -right-4 ">
              3
            </span>
            <span>
              <HiChatAlt2 className="text-4xl text-primary" />
            </span>
            <p className="text-primary text-2xl ">  Start asking questions</p>
            <p>
              It&apos;s that simple. Try out Quill today - it really takes
              less than a minute.
              .
            </p>

          </div>

        </div>

        <div className='mx-auto max-w-6xl px-6 lg:px-8'>
          <div className='mt-16 flow-root sm:mt-24'>
            <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
              <Image
                src='/file-upload-preview.jpg'
                alt='uploading preview'
                width={1419}
                height={732}
                quality={100}
                className='rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10'
              />
            </div>
          </div>
        </div>
      </WidthWrapper>
    </main>
  );
}
{
  /*<div className="relative flex place-content-start before:absolute before:h-[100vh] before:w-[100vw] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-  after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">

      </div>*/
}