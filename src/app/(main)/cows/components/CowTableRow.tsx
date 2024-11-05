import { TableCell, TableRow } from "@/components/ui/table"
import ActionButtons from "./ActionButtons"
import ICow from "@/types"

const CowTableRow = ({ cow }: { cow: ICow }) => {
  return (
<TableRow>
      <TableCell className="font-medium">{cow.cowId}</TableCell>
      <TableCell>{cow.name}</TableCell>
      <TableCell>{cow.dateOfBirth}</TableCell>
      <TableCell className="text-right">{cow.sex}</TableCell>
      <TableCell>{cow.categoryId.name}</TableCell>
      <TableCell>
        <ActionButtons />
      </TableCell>
    </TableRow>  )
}

export default CowTableRow