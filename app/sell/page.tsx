"use client"
import { SellForm } from "@/components/forms/SellForm"
import { Card } from "@/components/ui/card"

export default function SellPage() {
  return (
    <main className="mx-auto max-w-7xl mb-5">
      <Card>
        <SellForm />
      </Card>
    </main>
  )
}
