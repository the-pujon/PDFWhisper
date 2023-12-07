"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { Button, buttonVariants } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { useContext } from "react";
import { trpc } from "@/app/_trpc/client";
import { MdOutlineCheck } from "react-icons/md";

const AddFAQs = () => {
  const { toast } = useToast();
  const utils = trpc.useContext();

  const { mutate: FAQCreate } = trpc.faq.createFAQs.useMutation({
    onSuccess: () => {
      utils.faq.getFAQs.invalidate();
      toast({
        variant: "default",
        action: (
          <div className="w-full flex items-center">
            <MdOutlineCheck className="text-2xl mr-2 p-1 bg-primary rounded-full text-white" />
            <span className="first-letter:capitalize">
              successfully created
            </span>
          </div>
        ),
      });
    },
  });

  return (
    <div className="p-5">
      <div className="text-5xl text-black font-bold mb-5">Add FAQ</div>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          FAQCreate({
            //@ts-ignore
            question: e.target.question.value,
            //@ts-ignore
            answer: e.target.answer.value,
          });
        }}
        className="flex flex-col gap-3 justify-center h-full"
      >
        <div className="grid w-full items-center gap-1.5">
          <label
            htmlFor="question"
            className="text-xl text-black font-semibold"
          >
            Question
          </label>
          <Input
            type="text"
            id="question"
            name="question"
            placeholder="Question"
            className="w-full bg-transparent border border-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>{" "}
        <div className="grid w-full gap-1.5">
          <label htmlFor="answer" className="text-xl text-black font-semibold">
            Answer
          </label>
          <Textarea
            placeholder="Type your message here."
            id="answer"
            name="answer"
            className=" bg-transparent border border-gray-500 h-36 appearance-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <Button
          type="submit"
          className={buttonVariants({
            className: `bg-primary`,
          })}
        >
          Add FAQ
        </Button>
      </form>
    </div>
  );
};

export default AddFAQs;
