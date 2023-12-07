"use client";

import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { FiLoader, FiSend } from "react-icons/fi";
import { Textarea } from "../ui/textarea";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import { trpc } from "@/app/_trpc/client";
import { useToast } from "../ui/use-toast";
import { MdOutlineCheck } from "react-icons/md";

const Contact = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const [isSending, setIsSending] = useState<string | null>(null);
  const { toast } = useToast();

  /**
   * for creating contact information in db
   */
  const { mutate: createContact } =
    trpc.contactUs.createContactInfo.useMutation({
      onSuccess: () => {
        toast({
          variant: "default",
          action: (
            <div className="w-full flex items-center">
              <MdOutlineCheck className="text-2xl mr-2 p-1 bg-primary rounded-full text-white" />
              <span className="first-letter:capitalize">
                Email sent successfully
              </span>
            </div>
          ),
        });
        setIsSending(null);
      },
      onError(err) {
        console.error(err);
      },
    });

  /**
   * for creating feedbacks in db
   */
  const { mutate: createFeedback } =
    trpc.feedbackInfo.createFeedback.useMutation({
      onSuccess: () => {
        toast({
          variant: "default",
          action: (
            <div className="w-full flex items-center">
              <MdOutlineCheck className="text-2xl mr-2 p-1 bg-primary rounded-full text-white" />
              <span className="first-letter:capitalize">
                Feedback sent successfully
              </span>
            </div>
          ),
        });
        setIsSending(null);
      },
      onError(err) {
        console.error(err);
      },
    });

  /**
   * Sending email
   */
  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.current) {
      console.error("Form reference is null or not an HTMLFormElement");
      return;
    }

    //getting all contact data from form
    const formData = new FormData(form.current);
    const emailValue = formData.get("user_email");
    const firstName = formData.get("user_name");
    const lastName = formData.get("lastName");
    const fullName = firstName! + " " + lastName!;
    const message = formData.get("message");
    const phone = formData.get("number");

    if (emailValue && message && phone && fullName) {
      try {
        setIsSending("contact");
        await emailjs.sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          form.current,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        );

        createContact({
          name: fullName,
          phone: phone! as string,
          email: emailValue! as string,
          message: message! as string,
        });
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      toast({
        variant: "destructive",
        title: "Please fill all fields",
      });
    }
    if (form.current) {
      form.current.reset();
    }
  };

  return (
    <div className="min-h-[100vh]">
      <div className="flex justify-center items-center min-h-screen">
        <div className="container mx-auto my-4 px-4 lg:px-20">
          {/* contact */}
          <form
            ref={form}
            onSubmit={(e) => sendEmail(e)}
            className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl"
          >
            <div className="flex">
              <h1 className="font-bold uppercase text-5xl">Connect with us</h1>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
              {/* name */}
              <input
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="text"
                name="user_name"
                placeholder="First Name*"
                required
              />
              {/* last name */}
              <input
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="text"
                name="lastName"
                placeholder="Last Name*"
                required
              />
              {/* email */}
              <input
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="email"
                name="user_email"
                placeholder="Email*"
                required
              />
              {/* phone */}
              <input
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="number"
                name="number"
                placeholder="Phone*"
                required
              />
            </div>
            <div className="my-4">
              {/* message */}
              <textarea
                placeholder="Message*"
                required
                name="message"
                className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              ></textarea>
            </div>
            <div className="my-2 w-1/2 lg:w-1/4">
              <button
                type="submit"
                className="uppercase text-sm font-bold tracking-wide bg-primary text-gray-100 p-3 rounded-lg w-full text-center flex items-center justify-center
                          focus:outline-none focus:shadow-outline"
              >
                {isSending === "contact" ? (
                  <FiLoader
                    className={`text-2xl text-center text-white animate-spin`}
                  />
                ) : (
                  <>Send Message</>
                )}
              </button>
            </div>
          </form>

          {/* feedback */}
          <div className="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-primary rounded-2xl">
            <div className="flex flex-col text-white">
              <h1 className="font-bold uppercase text-4xl my-4">
                Give Us Feedback
              </h1>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsSending("feedback");
                  createFeedback({
                    message: (e.target as HTMLFormElement).feedback.value,
                  });
                  (e.target as HTMLFormElement).reset();
                }}
                className="relative"
              >
                <Textarea
                  name="feedback"
                  placeholder="Enter your question..."
                  required
                  className="resize-none text-black pr-12 text-base h-32 py-3 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch "
                />

                <Button
                  type="submit"
                  className="absolute bottom-1.5 right-[8px] p-2 w-12"
                  aria-label="send message"
                >
                  {isSending === "feedback" ? (
                    <FiLoader
                      className={`text-2xl text-center text-white animate-spin`}
                    />
                  ) : (
                    <FiSend className="text-xl" />
                  )}
                </Button>
              </form>

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
    </div>
  );
};

export default Contact;
