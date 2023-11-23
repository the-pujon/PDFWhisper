"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trpc } from "@/app/_trpc/client";

const ShowFAQs = () => {
  const { data: FAQs } = trpc.getFAQs.useQuery();

  return (
    <div className="">
      <div className="flex items-center min-h-[20rem]">
        <div className="w-full text-5xl font-bold">
          The Alcove of Common <span className="text-primary">PDFWhisper</span>{" "}
          Queries
        </div>
        <div className="w-full">
          {FAQs?.map((faq) => (
            <Accordion
              type="single"
              collapsible
              className="w-full text-xl"
              key={faq.id}
            >
              <AccordionItem value={faq.id}>
                <AccordionTrigger className="hover:no-underline">
                  {faq?.question}
                </AccordionTrigger>
                <AccordionContent>{faq?.answer}</AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowFAQs;
