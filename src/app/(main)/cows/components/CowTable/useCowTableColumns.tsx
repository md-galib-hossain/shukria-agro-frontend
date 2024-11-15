/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";
import CowActions from "./CowActions";
import ICow from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const useCowTableColumns = (): ColumnDef<ICow>[] => {
  return [
    {
      accessorKey: "cowId",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cow Id
          <ArrowUpDown />
        </Button>
      ),
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
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown />
        </Button>
      ),
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
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Of Birth
          <ArrowUpDown />
        </Button>
      ),
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
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sex
          <ArrowUpDown />
        </Button>
      ),
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
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown />
        </Button>
      ),
      enableSorting: true,
      sortingFn: (rowA, rowB, columnId) => {
        const valueA = rowA.getValue(columnId)?.toString().toLowerCase() || ""; 
        const valueB = rowB.getValue(columnId)?.toString().toLowerCase() || "";
        return valueA.localeCompare(valueB);
      },
      cell: ({ row }) => <div>{row.original.categoryId?.name || "No Data"}</div>,  
    }
    ,
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <CowActions cow={row.original} />,
      enableSorting: false,
      enableHiding: false,
    },
  ];
};
