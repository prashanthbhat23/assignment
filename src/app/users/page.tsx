/* eslint-disable */

import DataTable from "@/app/components/DataTable"
import { usersData } from "@/app/data/users";
import { GoDotFill } from "react-icons/go";
const columns = [
  { id: "user", label: "User", align: "left" as 'left' },
  { id: "projectName", label: "Project Name", align: "center" as 'center' },
  { id: "users", label: "Users", align: "center" as 'center' },
  { id: "status", label: "Status", align: "center" as 'center' },
];

interface User {
  user: string;
  projectName: string;
  users: string;
  status: string;
  icon: string;
}

interface UsersData {
  users: User[]; 
}

const rows = usersData[" users"]; 

export default function User() {
  return (
    <div className="p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">Pagination Table</h1>
        <div className="flex gap-2 mb-4 items-center">
          <p className="text-gray-500">Home</p>
          <p className="text-gray-500"><GoDotFill /></p>
          <p className="text-gray-500">Filter React Table</p>
        </div>
        <DataTable columns={columns} rows={rows} selectable={false} />
      </div>
    </div>
  );
}
