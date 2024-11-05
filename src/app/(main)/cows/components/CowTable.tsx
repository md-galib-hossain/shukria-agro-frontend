import {
  Table,
  TableBody,

  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ICow from "@/types";
import CowTableRow from "./CowTableRow";

const CowTable = ({cows}: {cows:ICow[]}) => {
  return (
    <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">Cow Id</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>DOB</TableHead>
        <TableHead className="text-right">Sex</TableHead>
        <TableHead>Category</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {cows?.map((cow) => (
        <CowTableRow key={cow._id} cow={cow} />
      ))}
    </TableBody>
  </Table>
  );
};

export default CowTable;
