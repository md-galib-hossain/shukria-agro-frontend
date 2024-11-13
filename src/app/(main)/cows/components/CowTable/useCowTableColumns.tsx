/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import CowActions from "./CowActions";
import ICow from "@/types";


export const useCowTableColumns = (
  handleDelete: (id: string) => void,
  handleRowSelection: (row: any, isSelected: boolean) => void,
  handleSelectAll: (isSelected: boolean, rows: any[]) => void
): ColumnDef<ICow>[] => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllRowsSelected() || (table.getIsSomeRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => {
            table.toggleAllRowsSelected();
            handleSelectAll(!!value, table.getRowModel().rows);
          }}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
            handleRowSelection(row, !!value);
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "cowId",
      header: "Cow Id",
      cell: ({ row }) => <div>{row.getValue("cowId")}</div>,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "dateOfBirth",
      header: "Date Of Birth",
      cell: ({ row }) => <div>{new Date(row.getValue("dateOfBirth")).toLocaleDateString()}</div>,
    },
    {
      accessorKey: "sex",
      header: "Sex",
      cell: ({ row }) => <div>{row.getValue("sex")}</div>,
    },
    {
      accessorKey: "categoryId",
      header: "Category",
      cell: ({ row }) => <div>{row.original.categoryId.name || "No Data"}</div>,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <CowActions cow={row.original} handleDelete={handleDelete} />,
      enableSorting: false,
      enableHiding: false,
    },
  ];
};
