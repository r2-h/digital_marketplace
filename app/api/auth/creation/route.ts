import prisma from "@/lib/db"
import { stripe } from "@/lib/stripe"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { NextResponse } from "next/server"
import { unstable_noStore as noStore } from "next/cache"

export async function GET() {
  noStore()
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user || user === null || !user.id) {
    throw new Error("Something went wrong")
  }

  let dbUser = await prisma.user.findUnique({ where: { id: user.id } })

  if (!dbUser) {
    const account = await stripe.accounts.create({
      email: user.email as string,
      controller: {
        losses: {
          payments: "application",
        },
        fees: {
          payer: "application",
        },
        stripe_dashboard: {
          type: "express",
        },
      },
    })

    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email ?? "",
        firstName: user.given_name ?? "",
        lastName: user.family_name ?? "",
        profileImage: user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
        connectedAccountId: account.id,
      },
    })
  }
  return NextResponse.redirect(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://digital-marketplace-uz9e.vercel.app/"
  )
}
