import React from "react";
import { Button } from "../ui/button";
import { FiSend } from "react-icons/fi";
import { Textarea } from "../ui/textarea";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

const Contact = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="container mx-auto my-4 px-4 lg:px-20">
          <div className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
            <div className="flex">
              <h1 className="font-bold uppercase text-5xl">Connect with us</h1>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
              <input
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="First Name*"
              />
              <input
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Last Name*"
              />
              <input
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="email"
                placeholder="Email*"
              />
              <input
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="number"
                placeholder="Phone*"
              />
            </div>
            <div className="my-4">
              <textarea
                placeholder="Message*"
                className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              ></textarea>
            </div>
            <div className="my-2 w-1/2 lg:w-1/4">
              <button
                className="uppercase text-sm font-bold tracking-wide bg-primary text-gray-100 p-3 rounded-lg w-full
                          focus:outline-none focus:shadow-outline"
              >
                Send Message
              </button>
            </div>
          </div>

          <div className="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-primary rounded-2xl">
            <div className="flex flex-col text-white">
              <h1 className="font-bold uppercase text-4xl my-4">
                Give Us Feedback
              </h1>

              <div className="relative">
                <Textarea
                  //  rows={1}
                  //ref={textareaRef}
                  //maxRows={4}
                  //autoFocus
                  //onChange={handleInputChange}
                  //value={message}

                  placeholder="Enter your question..."
                  className="resize-none pr-12 text-base h-32 py-3 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch "
                />

                <Button
                  className="absolute bottom-1.5 right-[8px] p-2 w-12"
                  aria-label="send message"
                >
                  <FiSend className="text-xl" />
                </Button>
              </div>

              <div className="flex my-4 w-2/3 lg:w-1/2">
                <div className="flex flex-col">
                  <i className="fas fa-phone-alt pt-2 pr-2" />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-2xl">Call Us</h2>
                  <p className="text-white">Tel: +8801789173903</p>
                  <p className="text-white">Tel: +8801869663906</p>
                </div>
              </div>

              <div className="flex my-4 w-2/3 lg:w-1/2">
                <Link
                  href="https://www.facebook.com/ENLIGHTENEERING/"
                  target="_blank"
                  rel="noreferrer"
                  className=""
                >
                  <FaFacebook className="text-4xl" />
                </Link>
                <Link
                  href="https://www.linkedin.com/company/enlighteneering-inc-"
                  target="_blank"
                  rel="noreferrer"
                  className=""
                >
                  <FaLinkedin className="text-4xl" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*<div className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
        <div>
          <a
            title="Buy me a pizza"
            href="https://www.buymeacoffee.com/Dekartmc"
            target="_blank"
            className="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12"
          >
            <img
              className="object-cover object-center w-full h-full rounded-full"
              src="https://img.icons8.com/emoji/48/000000/pizza-emoji.png"
            />
          </a>
        </div>
      </div>*/}
    </>
  );
};

export default Contact;
