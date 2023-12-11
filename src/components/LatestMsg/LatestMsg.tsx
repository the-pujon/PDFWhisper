import { trpc } from "@/app/_trpc/client";
import React from "react";

function LatestMsg({
  fileId,className,
}: {
  fileId: string;
  className?: string;
}) {
  const { data } = trpc.getLatestMsg.useQuery({ id: fileId });

  // Extract the latest message
  const latestMsg = data?.[0];

  // Extract the text and userMessage properties
  const { text = "",isUserMessage = false } = latestMsg || {};


  return (
    <div className={className}>
      {isUserMessage ? (
        // Render user message
        <span>
          User: {text.length >= 37 ? text.slice(0,36) + "..." : text}
        </span>
      ) : (
        // Render AI message
        <span>AI: {text.length >= 37 ? text.slice(0,36) + "..." : text}</span>
      )}
    </div>
  );
}

export default LatestMsg;
