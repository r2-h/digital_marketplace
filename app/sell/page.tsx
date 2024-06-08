import { SellForm } from "@/components/forms/SellForm"
import { Card } from "@/components/ui/card"
import prisma from "@/lib/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import { unstable_noStore as noStore } from "next/cache"

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      stripeConnectedLinked: true,
    },
  })

  if (data?.stripeConnectedLinked === false) {
    return redirect("/billing")
  }

  return null
}

export default async function SellPage() {
  noStore()
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  if (!user) {
    throw new Error("Unauthorized")
  }

  const data = await getData(user.id)

  return (
    <main className="mx-auto max-w-7xl mb-5">
      <Card>
        <SellForm />
      </Card>
    </main>
  )
}
