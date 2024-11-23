import { ColumnDef } from "@tanstack/react-table";
import { SortableHeader } from "@/components/ReusableDataTable/components/SortableHeader";
import VaccineActions from "./components/VaccineActions";

export const useVaccineTableColumns = (): ColumnDef<{
  _id: string;
  name: string;
  info: string;
  interval: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}>[] => {
  return [
    {
      accessorKey: "_id",
      header: ({ column }) => <SortableHeader column={column} title="Vaccine OID" />,
      enableSorting: true,
      sortingFn: (rowA, rowB) => rowA.original._id.localeCompare(rowB.original._id),
      cell: ({ row }) => <div>{row.original._id}</div>,
    },
    {
      accessorKey: "name",
      header: ({ column }) => <SortableHeader column={column} title="Name" />,
      enableSorting: true,
      sortingFn: (rowA, rowB) => rowA.original.name.localeCompare(rowB.original.name),
      cell: ({ row }) => <div>{row.original.name}</div>,
    },
    {
      accessorKey: "info",
      header: ({ column }) => <SortableHeader column={column} title="Info" />,
      enableSorting: true,
      sortingFn: (rowA, rowB) =>
        rowA.original.info.localeCompare(rowB.original.info),
      cell: ({ row }) => <div>{row.original.info}</div>,
    },
    {
      accessorKey: "interval",
      header: ({ column }) => <SortableHeader column={column} title="Interval (Days)" />,
      enableSorting: true,
      sortingFn: (rowA, rowB) => rowA.original.interval - rowB.original.interval,
      cell: ({ row }) => <div>{row.original.interval}</div>,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <VaccineActions vaccine={row.original} />, 
      enableSorting: false,
      enableHiding: false,
    },
  ];
};
