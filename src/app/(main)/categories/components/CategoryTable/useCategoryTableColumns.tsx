import { SortableHeader } from "@/components/ReusableDataTable/components/SortableHeader";
import { ICategory } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import CategoryActions from "./components/CategoryActions";

export const useCategoryTableColumns = (): ColumnDef<ICategory>[]=> {
    return [ {
        accessorKey: "name",
        header: ({ column }) => <SortableHeader column={column} title="Name" />,
        enableSorting: true,
        sortingFn: (rowA, rowB, columnId) => {
          const valueA = rowA.getValue(columnId)?.toString().toLowerCase() || "";
          const valueB = rowB.getValue(columnId)?.toString().toLowerCase() || "";
          return valueA.localeCompare(valueB);
        },
        cell: ({ row }) => <div>{row.getValue("name")}</div>,
      },{
        accessorKey: "description",
        enableSorting: false,
        header: () => <div className="text-start">Description</div>,
        cell: ({ row }) => <div>{row.getValue("description")}</div>,
      },
      
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <CategoryActions category={row.original} />,
        enableSorting: false,
        enableHiding: false,
        
      },]
}