"use client"

import { UploadDropzone } from "@/lib/uploadthing"
import { SubmitButton } from "../SubmitButton"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import { TipTapEditor } from "../Tiptap"
import { Textarea } from "../ui/textarea"
import { Input } from "../ui/input"
import { State, sellProduct } from "@/app/actions"
import { JSONContent } from "@tiptap/react"
import { useFormState } from "react-dom"
import { useEffect, useState } from "react"
import { useToast } from "../ui/use-toast"
import { redirect } from "next/navigation"
import { SelectCategory } from "../SelectCategory"

export function SellForm() {
  const initialState: State = { status: undefined, message: "" }
  const [state, formAction] = useFormState(sellProduct, initialState)

  const [json, setJson] = useState<JSONContent | null>(null)
  const [images, setImages] = useState<string[] | null>(null)
  const [productFile, setProductFile] = useState<string | null>(null)

  const { toast } = useToast()

  useEffect(() => {
    if (state?.status === "success") {
      toast({
        title: state?.status,
        description: state?.message,
      })
      redirect("/")
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
        <CardTitle>Sell your product with ease</CardTitle>
        <CardDescription>Please describe your product here in detail so that it can be sold</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-10">
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="name">Name</Label>
          <Input type="text" placeholder="Name of your product" name="name" required min={3} />
          {state?.error?.["name"] && <p className="text-destructive">{state.error["name"]}</p>}
        </div>
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="category">Category</Label>
          <SelectCategory />
          {state?.error?.["category"] && <p className="text-destructive">{state.error["category"]}</p>}
        </div>
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="price">Price</Label>
          <Input placeholder="$" type="number" name="price" required />
          {state?.error?.["price"] && <p className="text-destructive">{state.error["price"]}</p>}
        </div>
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="smallDescription">Small summary</Label>
          <Textarea
            placeholder="Please describe your product"
            name="smallDescription"
            required
            minLength={10}
          />
          {state?.error?.["smallDescription"] && (
            <p className="text-destructive">{state.error["smallDescription"]}</p>
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          <input name="description" className="hidden" value={JSON.stringify(json)} />
          <Label htmlFor="description">Description</Label>
          <TipTapEditor json={json} setJson={setJson} />
          {state?.error?.["description"] && <p className="text-destructive">{state.error["description"]}</p>}
        </div>
        <div className="flex flex-col gap-y-2">
          <input className="hidden" value={JSON.stringify(images)} name="images" />
          <Label htmlFor="images">Product images</Label>
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => { 
              setImages(res.map((item) => item.url))
              toast({
                title: "Yor images have been uploaded",
              })
            }}
            onUploadError={(error: Error) => {
              toast({
                variant: "destructive",
                title: "Something went wrong, try again",
              })
            }}
          />
          {state?.error?.["images"] && <p className="text-destructive">{state.error["images"]}</p>}
        </div>
        <div className="flex flex-col gap-y-2">
          <input className="hidden" value={productFile ?? ""} name="productFile" />
          <Label htmlFor="productFile">Product file</Label>
          <UploadDropzone
            endpoint="productFileUpload"
            onClientUploadComplete={(res) => {
              setProductFile(res[0].url)
              toast({
                title: "Yor images have been uploaded",
              })
            }}
            onUploadError={(error: Error) => {
              toast({
                variant: "destructive",
                title: "Something went wrong, try again",
              })
            }}
          />
          {state?.error?.["productFile"] && <p className="text-destructive">{state.error["productFile"]}</p>}
        </div>
      </CardContent>
      <CardFooter className="mt-5">
        <SubmitButton />
      </CardFooter>
    </form>
  )
}
