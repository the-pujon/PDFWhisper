import ChatsWrapper from "@/components/Chats/ChatsWrapper/ChatsWrapper";
import PDFShower from "@/components/PDFShower/PDFShower";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound, redirect } from "next/navigation";

interface PageProps {
  params: {
    fileid: string;
  };
}

export async function generateStaticParams() {
  const files =await db.file.findMany()
  return files.map((file)=>{
    //console.log(file.id)
    return {
      fileid: file.id
    }
  })
}


const Page = async ({ params }: PageProps) => {
  const { fileid } = params;

  const { getUser } = getKindeServerSession();
  const user = getUser();

  if (!user || !user.id) redirect(`/auth-callback?origin=dashboard/${fileid}`);

  const file = await db.file.findFirst({
    where: {
      id: fileid,
      userId: user.id,
    },
  });

  if (!file) notFound();

  return (
    <div className="flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]  mt-16 sm:mt-10">
      <div className="mx-auto w-full max-w-8xl grow lg:flex ">
        {/* Left sidebar & main wrapper */}
        <div className="flex-1 xl:flex">
          <div className="xl:flex-1 xl:pl-4">
            {/* Main area */}
            <PDFShower url={file.url} />
          </div>
        </div>

        <div className="shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
          <ChatsWrapper fileId={file.id} />
        </div>
      </div>
    </div>
  );
};

export default Page;
