import { useRouter } from "next/router";
import { useCallback } from "react";

export default function Layout( {children, title} ) {
    
    const router = useRouter();

    const handleHome = useCallback(()=> {
        router.push(`/`)
    }, [])

    return (
        <div className="h-full min-h-screen relative">
            <div className="w-full h-72 bg-[url('/capa.jpeg')] bg-[#024F6B] bg-center pt-11 px-32 flex justify-center items-center ">
                <img className=" absolute  top-10 cursor-pointer" alt="Logo" src="/wnlogo.png" onClick={handleHome} />
                <h1 className="text-white text-2xl w-8/12 text-center mt-10">{title}</h1>
            </div>
            {children}
            <div className="pb-40"></div>
            <footer className="w-full h-28 absolute bottom-0 bg-[#94E5FF] flex justify-center items-center">
                <div className="w-4/5 h-4/5 flex items-center flex-wrap">
                    <h3 className="text-[#024F6B]">Copyright Wave News © 2022 All rights reserved. </h3>
                </div>
            </footer>
        </div>
    )
}