import DataTable from "@/app/components/DataTable"
import { users } from "@/app/data/users";
import { GoDotFill } from "react-icons/go";
import InfoCard from "../components/InfoCard";
import { FaCheckCircle, FaClock, FaFileInvoice, FaShippingFast } from "react-icons/fa";
const columns = [
  { id: "user", label: "User", align: "left" as 'left' },
  { id: "projectName", label: "Project Name", align: "center" as 'center' },
  { id: "users", label: "Users", align: "center" as 'center' },
  { id: "status", label: "Status", align: "center" as 'center' },
];


const rows = users;

export default function Invoice() {
  return (
    <div className="p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">Ivoice List</h1>
        <div className="flex gap-2 mb-4 items-center">
          <p className="text-gray-500">Home</p>
          <p className="text-gray-500"><GoDotFill /></p>
          <p className="text-gray-500">Invoice List</p>
        </div>
        <div>
          <div className="grid grid-cols-4 gap-4 p-6">
            <InfoCard
              title="Total Invoices"
              count="7"
              icon={<FaFileInvoice />}
              bgColor="bg-blue-100"
              textColor="blue-600"
            />
            <InfoCard
              title="Shipped Invoices"
              count="3"
              icon={<FaShippingFast />}
              bgColor="bg-orange-100"
              textColor="orange-600"
            />
            <InfoCard
              title="Delivered Invoices"
              count="3"
              icon={<FaCheckCircle />}
              bgColor="bg-green-100"
              textColor="green-600"
            />
            <InfoCard
              title="Pending Invoices"
              count="1"
              icon={<FaClock />}
              bgColor="bg-yellow-100"
              textColor="yellow-600"
            />
          </div>
          <DataTable columns={columns} rows={rows} />
        </div>
      </div>
    </div>
  );
}
