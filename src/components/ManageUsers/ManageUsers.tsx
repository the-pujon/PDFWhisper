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

const ManageUsers = () => {
  //const [updateUserRole, setUpdateUserRole] = useState<string | null>(null);

  const utils = trpc.useContext();
  const { toast } = useToast();

  /**
   * getting user data
   */
  const { data: users } = trpc.user.getUsers.useQuery();

  /**
   * updating user
   */
  const { mutate: updateRole } = trpc.user.updateUserRole.useMutation({
    onSuccess: () => {
      utils.user.getUsers.invalidate();
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
   * deleting user
   */
  const { mutate: deleteUser } = trpc.user.deleteUser.useMutation({
    onSuccess: () => {
      utils.user.getUsers.invalidate();
      toast({
        variant: "destructive",
        title: "Successfully deleted",
      });
    },
  });

  return (
    <div className='mt-0 sm:mt-8' >
       <div className="text-4xl sm:text-5xl text-black font-bold mb-5 pl-2">Manage Users</div>
         <Table >
      <TableHeader>
        <TableRow>
          <TableHead className="">No</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="">Role</TableHead>
          <TableHead>Subscription Expire Date</TableHead>
          <TableHead>User Type</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user, index) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className="">{user.role}</TableCell>

            <TableCell className="">
              {user?.stripeCurrentPeriodEnd ? (
                <div className="">
                  {differenceInDays(
                    new Date(user?.stripeCurrentPeriodEnd),
                    new Date()
                  ) < 0 ? (
                    <span className="text-destructive">
                      {format(
                        new Date(user?.stripeCurrentPeriodEnd),
                        "HH:mm a : dd:mm:yyyy"
                      )}
                    </span>
                  ) : (
                    <span>
                      {format(
                        new Date(user?.stripeCurrentPeriodEnd),
                        "HH:mm a : dd:mm:yyyy"
                      )}
                    </span>
                  )}
                </div>
              ) : (
                <div>Free (No Expire Date)</div>
              )}
            </TableCell>

            <TableCell className="">
              {user.stripePriceId ? <span>Pro</span> : <span>Free</span>}
            </TableCell>

            <TableCell className="flex item-center gap-2">
              <button
                onClick={() => {
                  updateRole({ id: user.id });
                }}
                disabled={user.role === "admin"}
                title="Make Admin"
                className="text-xl border-2 text-primary border-primary rounded-full p-1 disabled:cursor-not-allowed disabled:text-gray-300 disabled:border-gray-300"
              >
                <MdOutlineAdminPanelSettings />
              </button>
              <button
                disabled={user.role === "admin"}
                onClick={() => {
                  deleteUser({ id: user.id });
                }}
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

export default ManageUsers;
