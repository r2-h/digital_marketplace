import { SelectCategory } from "@/components/SelectCategory"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default async function SellPage() {
  return (
    <main className="mt-auto">
      <Card>
        <form>
          <CardHeader>
            <CardTitle>Sell your product with ease</CardTitle>
            <CardDescription>
              Please describe your product here in detail so that it can be sold
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-10">
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="email">Name</Label>
              <Input type="text" placeholder="Name of your product" />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="email">Category</Label>
              <SelectCategory />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="email">Price</Label>
              <Input placeholder="$" type="number" />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="email">Small summary</Label>
              <Textarea placeholder="Please describe your product" />
            </div>
          </CardContent>
        </form>
      </Card>
    </main>
  )
}
