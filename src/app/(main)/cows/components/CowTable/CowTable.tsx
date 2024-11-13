/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTable } from "@/app/(main)/dashboard/components/data-table";
import ICow from "@/types";

interface CowTableProps {
  cows: ICow[];
  columns: any
//   handleDelete: (id: string) => void;
//   handleRowSelection: (row: any, isSelected: boolean) => void;
//   handleSelectAll: (isSelected: boolean, rows: any[]) => void;
}

const CowTable = ({ cows, columns }: CowTableProps) => {
//   const columns = useCowTableColumns(handleDelete, handleRowSelection, handleSelectAll);

  return <DataTable columns={columns} data={cows} />;
};

export default CowTable;
