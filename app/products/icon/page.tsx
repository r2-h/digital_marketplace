import { Suspense } from "react"

export default async function IconPage() {
  return (
    <div>
      IconPage <Suspense fallback={<div>Loading...</div>}>ICON</Suspense>
    </div>
  )
}
