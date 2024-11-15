/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";
import CowActions from "./components/CowActions";
import {ICow} from "@/types";
import { SortableHeader } from "@/components/ReusableDataTable/components/SortableHeader";

export const useCowTableColumns = (): ColumnDef<ICow>[] => {
  return [
    {
      accessorKey: "cowId",
      header: ({ column }) => <SortableHeader column={column} title="Cow Id" />,
      enableSorting: true,
      sortingFn: (rowA, rowB, columnId) => {
        const valueA = rowA.getValue(columnId)?.toString().toLowerCase() || "";
        const valueB = rowB.getValue(columnId)?.toString().toLowerCase() || "";
        return valueA.localeCompare(valueB);
      },
      cell: ({ row }) => <div>{row.getValue("cowId")}</div>,
    },
    {
      accessorKey: "name",
      header: ({ column }) => <SortableHeader column={column} title="Name" />,
      enableSorting: true,
      sortingFn: (rowA, rowB, columnId) => {
        const valueA = rowA.getValue(columnId)?.toString().toLowerCase() || "";
        const valueB = rowB.getValue(columnId)?.toString().toLowerCase() || "";
        return valueA.localeCompare(valueB);
      },
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "dateOfBirth",
      header: ({ column }) => <SortableHeader column={column} title="Date Of Birth" />,
      enableSorting: true,
      sortingFn: (rowA, rowB, columnId) => {
        const valueA = new Date(rowA.getValue(columnId)).getTime();
        const valueB = new Date(rowB.getValue(columnId)).getTime();
        return valueA - valueB;
      },
      cell: ({ row }) => (
        <div>{new Date(row.getValue("dateOfBirth")).toLocaleDateString()}</div>
      ),
    },
    {
      accessorKey: "sex",
      header: ({ column }) => <SortableHeader column={column} title="Sex" />,
      enableSorting: true,
      sortingFn: (rowA, rowB, columnId) => {
        const valueA = rowA.getValue(columnId)?.toString().toLowerCase() || "";
        const valueB = rowB.getValue(columnId)?.toString().toLowerCase() || "";
        return valueA.localeCompare(valueB);
      },
      cell: ({ row }) => <div>{row.getValue("sex")}</div>,
    },
    {
      accessorKey: "categoryId.name",
      header: ({ column }) => <SortableHeader column={column} title="Category" />,
      enableSorting: true,
      sortingFn: (rowA, rowB, columnId) => {
        const valueA = rowA.getValue(columnId)?.toString().toLowerCase() || "";
        const valueB = rowB.getValue(columnId)?.toString().toLowerCase() || "";
        return valueA.localeCompare(valueB);
      },
      cell: ({ row }) => <div>{row.original.categoryId?.name || "No Data"}</div>,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <CowActions cow={row.original} />,
      enableSorting: false,
      enableHiding: false,
    },
  ];
};
