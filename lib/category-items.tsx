import { ChefHat, Globe, PartyPopper } from "lucide-react"
import { ReactNode } from "react"

type Items = {
  name: string
  title: string
  image: ReactNode
  id: number
}

export const categoryItems: Items[] = [
  {
    id: 0,
    name: "template",
    title: "Template",
    image: <Globe />,
  },
  {
    id: 1,
    name: "uikit",
    title: "Ui Kit",
    image: <ChefHat />,
  },
  {
    id: 2,
    name: "icon",
    title: "Icon",
    image: <PartyPopper />,
  },
]
