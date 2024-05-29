import { SettingsForm } from "@/components/forms/SettingsForm"
import { Card } from "@/components/ui/card"
import prisma from "@/lib/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

async function getData() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const data = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
    select: {
      firstName: true,
      lastName: true,
      email: true,
    },
  })

  return data
}

export default async function SettingsPage() {
  const data = await getData()

  return (
    <section className="max-w-7xl mx-auto md:px-8">
      <Card>
        <SettingsForm
          email={data?.email as string}
          lastName={data?.lastName as string}
          firstName={data?.firstName as string}
        />
      </Card>
    </section>
  )
}
