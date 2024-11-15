import { ColumnDef } from "@tanstack/react-table";
import LactationActions from "./components/LactationActions";
import { SortableHeader } from "@/components/ReusableDataTable/components/SortableHeader";

export const useLactationTableColumns = (): ColumnDef<{
  _id: string;
  lactationNumber: number;
  lactationStartDate: Date;
  lactationEndDate: Date ;
  milkYield: number;
  cowOID: {
    _id: string;
    cowId: string;
    name: string;
  };
}>[] => {
  return [
    {
      accessorKey: "cowOID",
      header: ({ column }) => <SortableHeader column={column} title="Cow ID" />,
      enableSorting: true,
      sortingFn: (rowA, rowB) => {
        const cowIdA = rowA.original.cowOID?.cowId || "";
        const cowIdB = rowB.original.cowOID?.cowId || "";
        return cowIdA.localeCompare(cowIdB);
      },
      cell: ({ row }) => (
        <div>
          {row.original.cowOID?.cowId} - {row.original.cowOID?.name}
        </div>
      ),
    },
    {
      accessorKey: "lactationNumber",
      header: ({ column }) => <SortableHeader column={column} title="Lactation Number" />,
      enableSorting: true,
      sortingFn: (rowA, rowB) =>
        rowA.original.lactationNumber - rowB.original.lactationNumber,
      cell: ({ row }) => <div>{row.original.lactationNumber}</div>,
    },
    {
      accessorKey: "lactationStartDate",
      header: ({ column }) => <SortableHeader column={column} title="Lactation Start Date" />,
      enableSorting: true,
      sortingFn: (rowA, rowB) => {
        const dateA = new Date(rowA.original.lactationStartDate).getTime();
        const dateB = new Date(rowB.original.lactationStartDate).getTime();
        return dateA - dateB;
      },
      cell: ({ row }) => (
        <div>
          {new Date(row.original.lactationStartDate).toLocaleDateString()}
        </div>
      ),
    },
    {
      accessorKey: "lactationEndDate",
      header: ({ column }) => <SortableHeader column={column} title="Lactation End Date" />,
      enableSorting: true,
      sortingFn: (rowA, rowB) => {
        const dateA = rowA.original.lactationEndDate
          ? new Date(rowA.original.lactationEndDate).getTime()
          : Infinity;
        const dateB = rowB.original.lactationEndDate
          ? new Date(rowB.original.lactationEndDate).getTime()
          : Infinity;
        return dateA - dateB;
      },
      cell: ({ row }) => (
        <div>
          {row.original.lactationEndDate
            ? new Date(row.original.lactationEndDate).toLocaleDateString()
            : "Ongoing"}
        </div>
      ),
    },
    {
      accessorKey: "milkYield",
      header: ({ column }) => <SortableHeader column={column} title="Milk Yield (L)" />,
      enableSorting: true,
      sortingFn: (rowA, rowB) =>
        rowA.original.milkYield - rowB.original.milkYield,
      cell: ({ row }) => <div>{row.original.milkYield || 0}</div>,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <LactationActions lactation={row.original} />,
      enableSorting: false,
      enableHiding: false,
    },
  ];
};
