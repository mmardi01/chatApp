import { ReactNode } from "react";

export default function MainLayout({children}: {children : ReactNode}) {
  return (
    <div className="bg-[#27262C] w-full h-screen">
    {
        children
    }
    </div>
  )
}
