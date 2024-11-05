import { Button } from "@/components/ui/button"

const ActionButtons = () => {
  return (
    <div className="flex gap-4">
    <Button variant="outline">Full Info</Button>
    <Button variant="outline">Update</Button>
    <Button variant="outline">Delete</Button>
  </div>  )
}

export default ActionButtons