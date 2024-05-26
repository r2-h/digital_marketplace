"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const navbarLinks = [
  {
    id: 0,
    name: "Home",
    href: "/",
  },
  {
    id: 1,
    name: "Templates",
    href: "/products/template",
  },
  {
    id: 2,
    name: "Ui Kits",
    href: "/products/ui-kit",
  },
  {
    id: 3,
    name: "Icons",
    href: "/products/icon",
  },
]

export function NavbarLinks({ className }: { className?: string }) {
  const location = usePathname()

  return (
    <div className={cn("hidden md:flex justify-center items-center  gap-x-2", className)}>
      {navbarLinks.map((item) => (
        <Link
          href={item.href}
          key={item.id}
          className={cn(
            "group flex items-center px-2 py-2 font-medium rounded-md",
            location === item.href ? "bg-muted" : "hover:bg-muted hover:bg-opacity-75"
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  )
}
