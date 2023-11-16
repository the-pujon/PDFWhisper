import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest } from "next/server";
import { z } from "zod";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { pinecone } from "@/lib/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { openai } from "@/lib/openai";
import { OpenAIStream,StreamingTextResponse } from "ai"


const SendMessageValidator = z.object({
  fileId: z.string(),
  message: z.string(),
});

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const { getUser } = getKindeServerSession();
  const user = getUser();

  const { id: userId } = user;

  if (!userId) return new Response("Unauthorized",{ status: 401 });

  const { fileId,message } = SendMessageValidator.parse(body);

  const file = await db.file.findFirst({
    where: {
      id: fileId,
      userId,
    },
  });

  if (!file) return new Response("Not found",{ status: 404 });

  await db.message.create({
    data: {
      text: message,
      isUserMessage: true,
      userId,
      fileId,
    },
  });

  //Vectorized message
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  const pineconeIndex = pinecone.Index("pdf");

  const vectorStore = await PineconeStore.fromExistingIndex(embeddings,{
    pineconeIndex,
  });

  console.log(vectorStore)

  const results = await vectorStore.similaritySearch(message,4);

  const previousMsg = await db.message.findMany({
    where: {
      fileId,
    },
    orderBy: {
      createdAt: "asc",
    },
    take: 6,
  });

  const formattedPrevMsg = previousMsg.map((msg) => ({
    role: msg.isUserMessage ? ("user" as const) : ("assistance" as const),
    content: msg.text,
  }));

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0,
    stream: true,
    messages: [
      {
        role: "system",
        content:
          "Use the following pieces of context (or previous conversation if needed) to answer the users question in markdown format.",
      },
      {
        role: "user",
        content: `Use the following pieces of context (or previous conversation if needed) to answer the users question in markdown format. \nIf you don't know the answer, just say that you don't know, don't try to make up an answer.

          \n----------------\n

          PREVIOUS CONVERSATION:
          ${formattedPrevMsg.map((message) => {
          if (message.role === "user") return `User: ${message.content}\n`;
          return `Assistant: ${message.content}\n`;
        })}

          \n----------------\n

          CONTEXT:
          ${results.map((r) => r.pageContent).join("\n\n")}

          USER INPUT: ${message}`,
      },
    ],
  });


  //@ts-ignore
  const stream = OpenAIStream(response,{
    async onCompletion(completion) {
      await db.message.create({
        data: {
          text: completion,
          isUserMessage: false,
          fileId,
          userId
        }
      })
    }
  })

  return new StreamingTextResponse(stream)

};
