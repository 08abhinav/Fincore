import Header from "@/components/Headers";
import { Children } from "react";

type Props = {
    children: React.ReactNode;
}
export default function DashboardLayout({children}: Props){
    return(
        <>
            <Header/>
            <main className="px-3 lg:px-14">
                {children}
            </main>
        </>
    )
}