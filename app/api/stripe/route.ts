import ProductEmail from "@/components/ProductEmail"
import { stripe } from "@/lib/stripe"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { headers } from "next/headers"
import { Resend } from "resend"
import { unstable_noStore as noStore } from "next/cache"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  noStore()
  const body = await req.text()
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const signature = headers().get("Stripe-Signature") as string

  let event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_SECRET_WEBHOOK as string)
  } catch (error: unknown) {
    return new Response("webhook error", { status: 400 })
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object

      const link = session.metadata?.link

      const { data, error } = await resend.emails.send({
        from: "RxUI <onboarding@resend.dev>",
        to: [user?.email || "hareksian23@gmail.com"],
        subject: "Your Product from RxUI",
        react: ProductEmail({
          link: link as string,
        }),
      })

      break
    }
    default: {
      console.log("unhandled event")
    }
  }

  return new Response(null, { status: 200 })
}
