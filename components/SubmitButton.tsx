"use client"
import { Loader2 } from "lucide-react"
import { useFormStatus } from "react-dom"
import { Button } from "./ui/button"

type Props = {
  children?: string
}
export const SubmitButton = ({ children = "Create your product" }: Props) => {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>Please wait
        </Button>
      ) : (
        <Button type="submit">{children}</Button>
      )}
    </>
  )
}
