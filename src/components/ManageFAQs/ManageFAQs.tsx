"use client";

import React, { useState } from "react";
import AddFAQs from "../AddFAQs/AddFAQs";
import { trpc } from "@/app/_trpc/client";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import UpdateFAQ from "../UpdateFAQ/UpdateFAQ";
import { useToast } from "../ui/use-toast";

const ManageFAQs = () => {
  const [seeAnswer, setSeeAnswer] = useState<string | null>(null);
  const utils = trpc.useContext();

  const { toast } = useToast();

  const [updatableFAQ, setUpdatableFAQ] = useState<{
    question: string;
    answer: string;
    id: string;
  } | null>(null);

  const { data: getFAQs } = trpc.getFAQs.useQuery();

  const { mutate: FAQDelete } = trpc.deleteFAQs.useMutation({
    onSuccess: () => {
      utils.getFAQs.invalidate();
      toast({
        variant: "destructive",
        title: `FAQ Deleted`,
      });
    },
  });

  const handleFAQUpdate = ({
    question,
    id,
    answer,
  }: {
    question: string;
    id: string;
    answer: string;
  }) => {
    utils.getFAQs.invalidate();
    setUpdatableFAQ({ question: question, answer: answer, id: id });
  };

  return (
    <div className="flex w-full h-screen divide-x">
      <div className="flex-1">
        <div>
          <AddFAQs />
          {updatableFAQ && (
            <UpdateFAQ
              setUpdatableFAQ={setUpdatableFAQ}
              updatableFAQ={updatableFAQ}
            />
          )}
        </div>
      </div>
      <div className="flex-1 p-5">
        {getFAQs?.map((faq, index) => (
          <div key={index}>
            <div className="flex w-full items-center justify-between">
              <div className="text-xl font-semibold">{faq.question}</div>
              <button title="see answer" onClick={() => setSeeAnswer(faq.id)}>
                <FaEye />
              </button>
            </div>
            <div
              className={`${
                seeAnswer === faq.id
                  ? "h-fit opacity-100 translate-y-0 "
                  : "h-0 opacity-0 -translate-y-2 scale-0"
              } transition-all duration-700 w-full flex gap-3 justify-between pl-6`}
            >
              <div className="w-full ">{faq.answer}</div>
              <div className="w-[2rem] flex-col">
                <button
                  className="w-[1rem] "
                  title="Edit FAQ"
                  onClick={() => handleFAQUpdate(faq)}
                >
                  <FaEdit />
                </button>
                <button
                  className="w-[1rem] "
                  title="Delete FAQ"
                  onClick={() => FAQDelete({ id: faq.id })}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageFAQs;
