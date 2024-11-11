/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Eye, Trash } from "lucide-react";
import ReusableDialog from "@/components/shared/ReUsableDialog/ReusableDialog";
import DetailView from "./DetailView";
import ICow from "@/types";
import CowUpdateForm from "./UpdateCow";
import { useUpdateCowMutation } from "@/redux/api/cowApi";
import cowUpdateSchema from "./ValidationSchemas";
import { useToast } from "@/hooks/use-toast";

export const useCowTableColumns = (
  handleDelete: (id: string) => void,
  handleRowSelection: (row: any, isSelected: boolean) => void,
  handleSelectAll: (isSelected: boolean, rows: any[]) => void
): ColumnDef<ICow>[] => {
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedCow, setSelectedCow] = useState<ICow | null>(null);

  const [updateCow] = useUpdateCowMutation();
  const { toast } = useToast();

  const handleUpdateFormSubmit = async (formData: any) => {
    const parsedData = cowUpdateSchema.safeParse(formData);
    if (!parsedData.success) {
      console.error(parsedData.error.format());
      return;
    }
    try {
      await updateCow({ id: formData.cowOID, data: parsedData.data });
      toast({ title: "Cow updated" });
      setOpenUpdateDialog(false);
      setSelectedCow(null);
    } catch (err: any) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
      });
    }
  };

  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllRowsSelected() ||
            (table.getIsSomeRowsSelected() && "indeterminate")
          }
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
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cow Id
          <ArrowUpDown
            className={
              column.getIsSorted()
                ? column.getIsSorted() === "asc"
                  ? "rotate-180"
                  : ""
                : ""
            }
          />
        </Button>
      ),
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
          <ArrowUpDown
            className={
              column.getIsSorted()
                ? column.getIsSorted() === "asc"
                  ? "rotate-180"
                  : ""
                : ""
            }
          />
        </Button>
      ),
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
          <ArrowUpDown
            className={
              column.getIsSorted()
                ? column.getIsSorted() === "asc"
                  ? "rotate-180"
                  : ""
                : ""
            }
          />
        </Button>
      ),
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
          <ArrowUpDown
            className={
              column.getIsSorted()
                ? column.getIsSorted() === "asc"
                  ? "rotate-180"
                  : ""
                : ""
            }
          />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("sex")}</div>,
    },
    {
      accessorKey: "categoryId",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown
            className={
              column.getIsSorted()
                ? column.getIsSorted() === "asc"
                  ? "rotate-180"
                  : ""
                : ""
            }
          />
        </Button>
      ),
      cell: ({ row }) => <div>{row.original.categoryId.name || "No Data"}</div>,
      sortingFn: (rowA, rowB) => {
        const nameA = rowA.original.categoryId.name || "";
        const nameB = rowB.original.categoryId.name || "";
        return nameA.localeCompare(nameB);
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const cow = row.original;
        return (
          <div className="flex space-x-2">
            <ReusableDialog
              trigger={
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              }
              title="Cow Details"
            >
              <DetailView cow={cow} />
            </ReusableDialog>
            <ReusableDialog
              trigger={
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedCow(cow);
                    setOpenUpdateDialog(true);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              }
              title="Update Cow"
              open={openUpdateDialog}
              onOpenChange={setOpenUpdateDialog}
            >
              {selectedCow && (
                <CowUpdateForm
                  cow={selectedCow}
                  onSubmit={handleUpdateFormSubmit}
                />
              )}
            </ReusableDialog>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDelete(cow._id)}
            >
              <Trash className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];
};
