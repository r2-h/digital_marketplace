import { Loader } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex items-center gap-5 justify-center">
      <Loader className="animate-spin" /> Loading...
    </div>
  )
}
