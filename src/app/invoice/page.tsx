import DataTable from "@/app/components/DataTable"
import { invoiceData } from "@/app/data/invoice";
import { GoDotFill } from "react-icons/go";
import { FaCheckCircle, FaClock, FaFileInvoice, FaShippingFast } from "react-icons/fa";
import InfoCard from "@/app/components/InfoCard";

const columns = [
  { id: "id", label: "Id" ,align: "center" as 'center' },
  { id: "billFrom", label: "Bill From" ,align: "center" as 'center' },
  { id: "billTo", label: "Bill To" ,align: "center" as 'center' },
  { id: "totalCost", label: "Total Cost" ,align: "center" as 'center' },
  { id: "status", label: "Status" ,align: "center" as 'center' },
  { id: "action", label: "Action" ,align: "center" as 'center' }
];

const rows = invoiceData["invoices"]; 

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
              bgColor="blue-100"
              textColor="blue-600"
            />
            <InfoCard
              title="Shipped Invoices"
              count="3"
              icon={<FaShippingFast />}
              bgColor="orange-100"
              textColor="orange-600"
            />
            <InfoCard
              title="Delivered Invoices"
              count="3"
              icon={<FaCheckCircle />}
              bgColor="green-100"
              textColor="green-600"
            />
            <InfoCard
              title="Pending Invoices"
              count="1"
              icon={<FaClock />}
              bgColor="yellow-100"
              textColor="yellow-600"
            />
          </div>
          <DataTable columns={columns} rows={rows} selectable={true} />
        </div>
      </div>
    </div>
  );
}
