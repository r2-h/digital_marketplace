"use client"

import { useFormState } from "react-dom"
import { SubmitButton } from "../SubmitButton"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { State, updateUserSettings } from "@/app/actions"
import { useEffect } from "react"
import { useToast } from "../ui/use-toast"

type Props = {
  firstName: string
  lastName: string
  email: string
}

export const SettingsForm = ({ firstName, lastName, email }: Props) => {
  const initialState: State = { status: undefined, message: "" }
  const [state, formAction] = useFormState(updateUserSettings, initialState)

  const { toast } = useToast()

  useEffect(() => {
    if (state?.status === "success") {
      toast({
        title: state?.status,
        description: state?.message,
      })
    } else if (state?.status === "error") {
      toast({
        variant: "destructive",
        title: state?.status,
        description: state?.message,
      })
    }
  }, [state])

  return (
    <form action={formAction}>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Here you will find settings regarding your account</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="text">First name</Label>
          <Input name="firstName" type="text" id="text" defaultValue={firstName} />
          {state?.error?.["firstName"] && <p className="text-destructive">{state.error["firstName"]}</p>}
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="lastName">Last name</Label>
          <Input name="lastName" type="text" id="lastName" defaultValue={lastName} />
          {state?.error?.["lastName"] && <p className="text-destructive">{state.error["lastName"]}</p>}
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" disabled defaultValue={email} />
        </div>
      </CardContent>
      <CardFooter className="mt-5">
        <SubmitButton>Update your settings</SubmitButton>
      </CardFooter>
    </form>
  )
}
