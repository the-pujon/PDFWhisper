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
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";

const ManageContactInfo = () => {
  //const [updateUserRole, setUpdateUserRole] = useState<string | null>(null);

  const utils = trpc.useContext();
  const { toast } = useToast();

  /**
   * getting contact information
   */
  const { data: contacts, isLoading } =
    trpc.contactUs.getAllContactInfo.useQuery();

  /**
   * deleting user
   */
  const { mutate: deleteContactInfo } =
    trpc.contactUs.deleteContactInfo.useMutation({
      onSuccess: () => {
        utils.contactUs.getAllContactInfo.invalidate();
        toast({
          variant: "destructive",
          title: "Successfully deleted",
        });
      },
    });

  return (
    <div className='mt-0 sm:mt-8' >
    <div className="text-4xl sm:text-5xl text-black font-bold mb-5 pl-2">Manage Contact</div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="">Phone</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6}>
                <Skeleton height={50} className="" count={15} />
              </TableCell>
            </TableRow>
          ) : (
            <>
              {contacts?.map((contact, index) => (
                <TableRow key={contact.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{contact.name || "null"}</TableCell>
                  <TableCell>{contact.email || "null"}</TableCell>
                  <TableCell className="">{contact.phone || "null"}</TableCell>
                  <TableCell className="">
                    {contact.message || "null"}
                  </TableCell>

                  <TableCell className="flex item-center gap-2">
                    <button
                      onClick={() => deleteContactInfo({ id: contact.id })}
                      title="Delete User"
                      className="text-xl border-2 text-destructive border-destructive rounded-full p-1 disabled:cursor-not-allowed disabled:text-gray-300 disabled:border-gray-300"
                    >
                      <MdOutlineClose />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageContactInfo;
