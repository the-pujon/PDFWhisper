'use client'

import { trpc } from "@/app/_trpc/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";



const ManageUsers = () => {

const {data: users} = trpc.getUsers.useQuery()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">No</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="">Role</TableHead>
<TableHead>User Type</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user, index) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{index+1}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className="">{user.role}</TableCell>
            <TableCell className="">{user.stripeCurrentPeriodEnd}</TableCell>
            <TableCell className="">{user.stripePriceId?<span>Pro</span>: <span>Free</span>}</TableCell>

            <TableCell className="">Action</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ManageUsers;
