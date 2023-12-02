"use client";

import { trpc } from "@/app/_trpc/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { differenceInDays, format } from "date-fns";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineCancel,
  MdOutlineCheck,
  MdOutlineClose,
} from "react-icons/md";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import { cn } from "@/lib/utils";

enum TakeAction {
  PENDING = "PENDING",
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
}

const ManageFeedback = () => {
  //const [updateUserRole, setUpdateUserRole] = useState<string | null>(null);

  const utils = trpc.useContext();
  const { toast } = useToast();

  /**
   * getting feedback
   */
  const { data: feedbacks } = trpc.feedbackInfo.getAllFeedback.useQuery();

  /**
   * updating action in feedback
   */
  const { mutate: updateFeedback } =
    trpc.feedbackInfo.updateFeedback.useMutation({
      onSuccess: () => {
        utils.feedbackInfo.getAllFeedback.invalidate();
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

  /**
   * delete feedback
   */
  const { mutate: deleteFeedback } =
    trpc.feedbackInfo.deleteFeedback.useMutation({
      onSuccess: () => {
        utils.feedbackInfo.getAllFeedback.invalidate();
        toast({
          variant: "destructive",
          title: "Successfully deleted",
        });
      },
    });

  return (
    <div className=" ">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">No</TableHead>
            <TableHead className="">Feedback</TableHead>
            <TableHead className="">Date</TableHead>
            <TableHead>Take Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {feedbacks?.map((feedback, index) => (
            <TableRow key={feedback.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{feedback.message || "null"}</TableCell>
              <TableCell>{feedback.createdAt || "null"}</TableCell>

              <TableCell className="flex item-center gap-2">
                <HoverCard>
                  <HoverCardTrigger
                    className={cn(
                      " rounded-full flex items-center justify-center px-2 text-xs  lowercase",
                      {
                        "border-red-500 border text-red-500  hover:bg-red-500 hover:text-white transition-all duration-200":
                          feedback.takeAction === "PENDING",
                        "border-yellow-500 border text-yellow-500  hover:bg-yellow-500 hover:text-white transition-all duration-200":
                          feedback.takeAction === "ONGOING",
                        "border-green-500 border text-green-500  hover:bg-green-500 hover:text-white transition-all duration-200":
                          feedback.takeAction === "COMPLETED",
                      }
                    )}
                  >
                    <span className="first-letter:capitalize">
                      {feedback.takeAction}
                    </span>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-fit">
                    {Object.values(TakeAction).map((text) => (
                      <button
                        onClick={() => {
                          updateFeedback({ id: feedback.id, takeAction: text });
                        }}
                        className={cn("w-full block text-sm  lowercase my-1", {
                          "rounded-md py-1 px-2 border-red-500 border text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 ":
                            text === "PENDING",
                          "rounded-md py-1 px-2 border-yellow-500 border text-yellow-500  hover:bg-yellow-500 hover:text-white transition-all duration-200":
                            text === "ONGOING",
                          "rounded-md py-1 px-2 border-green-500 border text-green-500  hover:bg-green-500 hover:text-white transition-all duration-200":
                            text === "COMPLETED",
                        })}
                        key={text}
                      >
                        {text}
                      </button>
                    ))}
                  </HoverCardContent>
                </HoverCard>
                <button
                  onClick={() => deleteFeedback({ id: feedback.id })}
                  title="Delete User"
                  className="text-xl border-2 text-destructive border-destructive rounded-full p-1 disabled:cursor-not-allowed disabled:text-gray-300 disabled:border-gray-300"
                >
                  <MdOutlineClose />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageFeedback;
