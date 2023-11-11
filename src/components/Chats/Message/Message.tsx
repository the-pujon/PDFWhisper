import { cn } from "@/lib/utils";
import { format } from "date-fns";
import React, { forwardRef } from "react";
import { FaUser, FaUserAlt } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

interface MessageProps {
  message: any;
  isNextMessageSamePerson: boolean;
}

const Message = forwardRef<HTMLDivElement, MessageProps>(
  ({ message, isNextMessageSamePerson }, ref) => {
    return (
      <div>
        <div
          ref={ref}
          className={cn("flex items-end", {
            "justify-end": message?.isUserMessage,
          })}
        >
          {/* Icons */}
          <div
            className={cn(
              "relative flex h-6 w-6 aspect-square items-center justify-center",
              {
                "order-2 bg-primary rounded-sm": message?.isUserMessage,
                "order-1 bg-zinc-800 rounded-sm": !message?.isUserMessage,
                invisible: isNextMessageSamePerson,
              }
            )}
          >
            {message?.isUserMessage ? (
              <FaUser className="fill-zinc-200 text-zinc-200 text-3xl" />
            ) : (
              <FaUserAlt className="fill-zinc-300 text-3xl" />
            )}
          </div>

          <div
            className={cn("flex flex-col space-y-2 text-base max-w-md mx-2", {
              "order-1 items-end": message?.isUserMessage,
              "order-2 items-start": !message?.isUserMessage,
            })}
          >
            <div
              className={cn("px-4 py-2 rounded-lg inline-block", {
                "bg-primary text-white": message?.isUserMessage,
                "bg-gray-200 text-gray-900": !message?.isUserMessage,
                "rounded-br-none":
                  !isNextMessageSamePerson && message?.isUserMessage,
                "rounded-bl-none":
                  !isNextMessageSamePerson && !message?.isUserMessage,
              })}
            >
              {typeof message?.text === "string" ? (
                <ReactMarkdown
                  className={cn("prose", {
                    "text-zinc-50": message?.isUserMessage,
                  })}
                >
                  {message?.text}
                </ReactMarkdown>
              ) : (
                message?.text
              )}
              {message?.id !== "loading-message" ? (
                <div
                  className={cn("text-[11px] select-none mt-2 w-full ", {
                    "text-zinc-500 text-right": !message?.isUserMessage,
                    "text-primary-foreground text-start": message?.isUserMessage,
                  })}
                >
                  {format(new Date(message?.createdAt), "HH:mm")}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Message.displayName = "Message";

export default Message;
