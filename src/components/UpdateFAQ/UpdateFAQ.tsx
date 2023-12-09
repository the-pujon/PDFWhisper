"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { Button, buttonVariants } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { trpc } from "@/app/_trpc/client";
import { MdOutlineCheck } from "react-icons/md";

interface UpdateFAQProps {
  setUpdatableFAQ: React.Dispatch<
    React.SetStateAction<{
      question: string;
      answer: string;
      id: string;
    } | null>
  >;
  updatableFAQ: { question: string; answer: string; id: string } | null;
}
const UpdateFAQ = ({ setUpdatableFAQ, updatableFAQ }: UpdateFAQProps) => {
  const { toast } = useToast();
  const utils = trpc.useContext();

  const { mutate: FAQUpdate } = trpc.faq.updateFAQs.useMutation({
    onSuccess: () => {
      utils.faq.getFAQs.invalidate();
      toast({
        variant: "default",
        action: (
          <div className="w-full flex items-center">
            <MdOutlineCheck className="text-2xl mr-2 p-1 bg-primary rounded-full text-white" />
            <span className="first-letter:capitalize">
              successfully updated
            </span>
          </div>
        ),
      });
    },
  });

  return (
    <div className="p-5">
      <div className="text-4xl sm:text-5xl text-black font-bold mb-5">Update FAQ</div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setUpdatableFAQ(null);

          FAQUpdate({
            //@ts-ignore
            question: e.target.question.value,
            //@ts-ignore
            answer: e.target.answer.value,
            id: updatableFAQ?.id!,
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
            //placeholder="Question"
            className="w-full"
            defaultValue={updatableFAQ?.question}
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
            defaultValue={updatableFAQ?.answer}
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

export default UpdateFAQ;
