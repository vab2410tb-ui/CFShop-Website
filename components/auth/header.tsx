import Image from "next/image"

interface HeaderProps {
    label: string;
}

export const Header = ({label}:HeaderProps) => {
    return (
        <div className="w-full flex flex-col items-center justify-center gap-y-4 ">
            <Image 
                src="/images/image.png"
                width={100}
                height={100}
                alt="logo"
               
            />
            <p className="text-muted-foreground text-sm">
                {label}
            </p>
        </div>
    )
}