import { devNull } from "os"
import GroupForm from "./GroupForm"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { Group } from "./HomePage";


interface Props {
  groups:Group [];
  setGroups:any;
  setConversation:any;
  setGroupConversation:any;
}
export default function Groups({groups,setGroups,setConversation,setGroupConversation}:Props) {
  const ref  = useRef<HTMLDivElement>(null)
  const [displayGroupForm, setDisplayGroupForm] = useState(false)


  useEffect(()=>{
     let handler = (e: MouseEvent)  => {
      if (!ref.current?.contains(e.target as Node)){
        setDisplayGroupForm(false)
      }
    }

    document.addEventListener("mousedown", handler)
    return () => {document.removeEventListener("mousedown", handler)}
  })
  
  
  const getGroupConversation = (id : string) =>  {
    axios.get(`http://localhost:5555/group/get?id=${id}`,{withCredentials: true})
    .then(res => {
      setGroupConversation(res.data)
      console.log(res.data)
      setConversation(null)
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <div className="h-[50%]">
      <div
        className={`${
          displayGroupForm ? "opacity-1" : "hidden"
        }  left-0 right-0 top-0 bottom-0 backdrop-blur-sm  absolute flex justify-center items-center`}
      >
        <div
          ref={ref}
          className="w-[600px] h-[800px] bg-[#1a1a1c] shadow-md rounded-[8px] border-[#28282b] border"
        >
          <GroupForm setGroups={setGroups} setDisplayGroupForm={setDisplayGroupForm} />
        </div>
      </div>
      <div className="bg-[#232327]">
        <h1 className="text-white  text-2xl  mb-2">Groups</h1>
        <button
          onClick={() => setDisplayGroupForm(true)}
          className="text-lg flex items-center cursor-pointer  duration-300 hover:text-white text-[#6d6d73]"
        >
          + Create Group
        </button>
      </div>
      <div className="pt-2=1 overflow-y-scroll h-[90%]">
        {groups?.map((group) => (
          <div key={group.id} onClick={()=> getGroupConversation(group.id)} className="text-lg flex items-center cursor-pointer  duration-300 hover:text-white text-[#3e3e45] mt-4">
            {group.name}
          </div>
        ))}
      </div>
    </div>
  );
}
