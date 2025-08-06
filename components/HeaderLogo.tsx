import Link from "next/link";
import Image from "next/image";

export default function HeaderLogo(){
    return(
        <Link href="/">
            <div className="items-center hidden lg:flex">
                <Image
                src="/logo.png"
                alt="logo"
                height={50}
                width={50}
                />
                <p className="font-semibold text-white text-2xl ml-1">Fincore</p>
            </div>
        </Link>
    )
}