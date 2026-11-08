import { Navbar } from "./_components/navbar";

interface ProtectedProps {
    children: React.ReactNode  
}

const ProtectedLayout = ({children}:ProtectedProps) => {
    return(
        <div className="min-h-screen w-full flex flex-col">
            <Navbar/>
            <main className="flex-1 w-full flex justify-center bg-[#F6F6F6]">
                {children}
            </main>
        </div>
    )
}

export default ProtectedLayout;