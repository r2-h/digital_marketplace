"use client"
import { Loader2 } from "lucide-react"
import { useFormStatus } from "react-dom"
import { Button } from "./ui/button"
import { ReactNode } from "react"

type Props = {
  children?: ReactNode
  className?: string
  price?: number
}
export const SubmitButton = ({ children = "Create your product", className, price }: Props) => {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <Button disabled className={className}>
          <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>Please wait
        </Button>
      ) : (
        <Button type="submit" className={className}>
          {children}
        </Button>
      )}
    </>
  )
}

export function BuyButton({ price }: { price: number }) {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <Button disabled size="lg" className="w-full mt-10">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button type="submit" size="lg" className="w-full mt-10">
          Buy for ${price}
        </Button>
      )}
    </>
  )
}
