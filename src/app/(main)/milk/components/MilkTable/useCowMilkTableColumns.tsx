/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";
// import CowActions from "./components/CowActions";
import { SortableHeader } from "@/components/ReusableDataTable/components/SortableHeader";
import { IMilk } from "@/types";

export const useCowMilkTableColumns = (setSelectedCowId: (cowId: string) => void): ColumnDef<IMilk>[] => {
  return [
    {
      accessorKey: "cowId",
      header: ({ column }) => <SortableHeader column={column} title="Cow ID" />,
      enableSorting: true,
      sortingFn: (rowA, rowB, columnId) => {
        const valueA = rowA.getValue(columnId)?.toString().toLowerCase() || "";
        const valueB = rowB.getValue(columnId)?.toString().toLowerCase() || "";
        return valueA.localeCompare(valueB);
      },
      // cell: ({ row }) => <div>{row.getValue("cowId")}</div>,
      cell: ({ row }) => (
        <div
          className="cursor-pointer text-center text-primary hover:underline"
          onClick={() => setSelectedCowId(row.getValue("cowId"))}
        >
          {row.getValue("cowId")}
        </div>
      ),
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <SortableHeader column={column} title="Date" />
      ),
      enableSorting: true,
      sortingFn: (rowA, rowB, columnId) => {
        const valueA = new Date(rowA.getValue(columnId)).getTime();
        const valueB = new Date(rowB.getValue(columnId)).getTime();
        return valueA - valueB;
      },
      cell: ({ row }) => (
        <div className="text-center">{new Date(row.getValue("date")).toLocaleDateString()}</div>
      ),
    },
    {
      accessorKey: "morningCollection",
      header: ({ column }) => (
        <SortableHeader column={column} title="Morning Collection (L)" />
      ),
      enableSorting: true,
      sortingFn: (rowA, rowB, columnId) => {
        const valueA = Number(rowA.getValue(columnId)) || 0;
        const valueB = Number(rowB.getValue(columnId)) || 0;
        return valueA - valueB;
      },
      cell: ({ row }) => <div className="text-center">{row.getValue("morningCollection")} L</div>,
    },
    {
      accessorKey: "eveningCollection",
      header: ({ column }) => (
        <SortableHeader column={column} title="Evening Collection (L)" />
      ),
      enableSorting: true,
      sortingFn: (rowA, rowB, columnId) => {
        const valueA = Number(rowA.getValue(columnId)) || 0;
        const valueB = Number(rowB.getValue(columnId)) || 0;
        return valueA - valueB;
      },
      cell: ({ row }) => <div className="text-center">{row.getValue("eveningCollection")} L</div>,
    },
    {
      accessorKey: "totalYield",
      header: ({ column }) => (
        <SortableHeader column={column} title="Total Collection (L)" />
      ),
      enableSorting: true,
      sortingFn: (rowA, rowB, columnId) => {
        const valueA = Number(rowA.getValue(columnId)) || 0;
        const valueB = Number(rowB.getValue(columnId)) || 0;
        return valueA - valueB;
      },
      cell: ({ row }) => <div className="text-center">{row.getValue("totalYield")} L</div>,
    },
    // {
    //   id: "actions",
    //   header: "Actions",
    //   cell: ({ row }) => <CowActions cow={row.original} />,
    //   enableSorting: false,
    //   enableHiding: false,
    // },
  ];
};
