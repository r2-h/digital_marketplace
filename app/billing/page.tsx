import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

import { Button } from "@/components/ui/button"

import { unstable_noStore as noStore } from "next/cache"
import prisma from "@/lib/db"
import { SubmitButton } from "@/components/SubmitButton"
import { CreateStripeAccoutnLink } from "../actions"

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      stripeConnectedLinked: true,
    },
  })

  return data
}

export default async function BillingPage() {
  noStore()
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  const data = await getData(user.id)

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      <Card>
        <CardHeader>
          <CardTitle>Billing</CardTitle>
          <CardDescription>Find all your details regarding your payments</CardDescription>
        </CardHeader>
        <CardContent>
          {data?.stripeConnectedLinked === false && (
            <form action={CreateStripeAccoutnLink}>
              <SubmitButton>Link your Accout to stripe</SubmitButton>
            </form>
          )}

          {/* {data?.stripeConnectedLinked === true && (
            <form action={GetStripeDashboardLink}>
              <SubmitButton>View Dashboard</SubmitButton>
            </form>
          )} */}
        </CardContent>
      </Card>
    </section>
  )
}
