import { useState } from "react";

type UsePaginationProps = {
  initialPage?: number;
  initialLimit?: number;
  totalItems: number;
};

const usePagination = ({
  initialPage = 1,
  initialLimit = 5,
  totalItems,
}: UsePaginationProps) => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const pageCount = Math.ceil(totalItems / limit);
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleChangeLimit = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1); 
  };

  return { page, limit, pageCount, handleChangePage, handleChangeLimit };
};

export default usePagination;
