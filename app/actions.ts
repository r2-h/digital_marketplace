"use server"
import prisma from "@/lib/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { type CategoryTypes } from "@prisma/client"
import { z } from "zod"

export type State = {
  status: "error" | "success" | undefined
  error?: Record<string, string[]>
  message?: string | null
}

const productSchema = z.object({
  name: z.string().min(3, { message: "The name has to be a min character length of 5" }),
  category: z.string().min(1, { message: "Category is required" }),
  price: z.number().min(1, { message: "The Price has to be bigger then 1" }),
  smallDescription: z.string().min(10, { message: "Please summarize your product more" }),
  description: z.string().min(10, { message: "Description is required" }),
  images: z.array(z.string(), { message: "Images are required" }),
  // productFile: z.string().min(1, { message: "Please upload a zip of your product" }),
})

export async function SellProduct(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user) {
    throw new Error("Something went wrong")
  }

  const validateFields = productSchema.safeParse({
    name: formData.get("name"),
    category: formData.get("category"),
    price: Number(formData.get("price")),
    smallDescription: formData.get("smallDescription"),
    description: formData.get("description"),
    images: JSON.parse(formData.get("images") as string),
    // productFile: formData.get("productFile"),
  })

  if (!validateFields.success) {
    const state: State = {
      status: "error",
      error: validateFields.error.flatten().fieldErrors,
      message: "There is a mistake with inputs",
    }
    return state
  }

  let dbUser = await prisma.user.findUnique({ where: { id: user.id } })

  await prisma.product.create({
    data: {
      category: validateFields.data.category as CategoryTypes,
      description: JSON.parse(validateFields.data.description),
      name: validateFields.data.name,
      price: validateFields.data.price,
      smallDescripton: validateFields.data.smallDescription,
      images: validateFields.data.images,
      userId: user.id,
    },
  })

  const state: State = {
    status: "success",
    message: "Your product has been created!",
  }
  return state
}
