import { devNull } from "os"
import GroupForm from "./GroupForm"
import { useEffect, useRef, useState } from "react"
import handler from "@/pages/api/hello"

export default function Groups() {
  const ref  = useRef<HTMLDivElement>(null)
  const [displayGroupForm, setDisplayGroupForm] = useState(false)
  useEffect(()=>{
    console.log('clicked')
     let handler = (e: MouseEvent)  => {
      if (!ref.current?.contains(e.target as Node)){
        setDisplayGroupForm(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => {document.removeEventListener("mousedown", handler)}
  })
  return (
    <div className="h-[50%]  ">
        <div className={`${displayGroupForm ? 'opacity-1' : 'hidden opacity-0'} duration-1000 transition-all left-0 right-0 top-0 bottom-0 backdrop-blur-sm  absolute flex justify-center items-center`}>
            <div  ref={ref} className="w-[400px] h-[600px] bg-[#1a1a1c] shadow-md rounded-[8px] border-[#28282b] border"><GroupForm/></div>
        </div>
      <div className="bg-[#232327]">
        <h1 className="text-white  text-2xl  mb-2">Groups</h1>
        <button onClick={() => setDisplayGroupForm(true)} className="text-lg flex items-center cursor-pointer  duration-300 hover:text-white text-[#6d6d73]"> + Create Group</button>
      </div>
      <div className="pt-2=1 overflow-y-scroll h-[90%]">
        <div className="text-lg flex items-center cursor-pointer  duration-300 hover:text-white text-[#3e3e45] mt-4">
          first name
        </div>
      </div>
    </div>
  )
}
