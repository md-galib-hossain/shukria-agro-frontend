"use client";

import { DataTable } from "@/components/ReusableDataTable/data-table";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import CreateCategory from "./components/CreateCategory/CreateCategory";
import { useCategoryTableColumns } from "./components/CategoryTable/useCategoryTableColumns";

const CowCategories = () => {
  const { data, isLoading, isError } = useGetAllCategoriesQuery({});

  const columns = useCategoryTableColumns();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load data</p>;

  return (
    <div className="container mx-auto py-10 space-y-6 bg-secondary px-10 rounded-2xl">
      <div className="flex justify-between items-center">
        <CreateCategory />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default CowCategories;
