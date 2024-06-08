import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import Link from "next/link"
import { MobileMenu } from "./MobileMenu"
import { NavbarLinks } from "./NavbarLinks"
import { ThemeSwitcher } from "./ThemSwitcher"
import { UserNav } from "./UserNav"
import { Button } from "./ui/button"

export async function Navbar() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  return (
    <nav className="relative max-w-7xl w-full flex md:grid md:grid-cols-12 items-center px-4 md:px-8 mx-auto py-7">
      <div className="flex gap-1 items-center md:col-span-3">
        <Link href="/">
          <h1 className="text-2xl font-semibold ">
            Rx<span className="text-primary">UI</span>
          </h1>
        </Link>
        <ThemeSwitcher />
      </div>

      <NavbarLinks className="md:col-span-6" />

      <div className="flex items-center gap-x-2 ms-auto md:col-span-3">
        {user && (
          <UserNav
            email={user.email as string}
            name={user.given_name as string}
            userImage={user.picture ?? `https://avatar.vercel.sh/${user.given_name}`}
          />
        )}
        {!user && (
          <div className="flex items-center gap-x-2">
            <Button asChild>
              <LoginLink>Login</LoginLink>
            </Button>
            <Button variant="secondary" asChild>
              <RegisterLink>Register</RegisterLink>
            </Button>
          </div>
        )}

        <MobileMenu className="md:hidden" />
      </div>
    </nav>
  )
}
