import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

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
            <div></div>
          </CardContent>
        </form>
      </Card>
    </main>
  )
}
