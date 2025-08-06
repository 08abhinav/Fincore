"use client"

import NavButton from "./NavButton"
import { usePathname } from "next/navigation"

const routes = [
    {
        href: "/",
        label: "Overview",
    },
    {
        href: "/transactions",
        label: "Transactions",
    },
    {
        href: "/accounts",
        label: "Accounts",
    },
    {
        href: "/categories",
        label: "Categories",
    },
    {
        href: "/settings",
        label: "Settings",
    }
]

export default function Navigation(){
    const pathName = usePathname()
    return(
        <nav className="hidden lg:flex items-center gap-x-2
        overflow-x-auto">
            {routes.map((route) => (
                <NavButton
                    key={route.href}
                    href={route.href}
                    label={route.label}
                    isActive={pathName === route.href}
                />
            ))}
        </nav>
    )
}