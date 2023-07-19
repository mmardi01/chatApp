import axios from "axios"
import { useEffect, useState } from "react"
import { Contact } from "./HomePage"
interface Props {
  contacts: Contact[]
  setConversation: any
}
export default function Contacts({ contacts,setConversation }: Props) {

  const getConversation = (id: string) => {
    axios.get(`http://localhost:5555/chat/get?id=${id}`,{withCredentials: true})
    .then(res=> {
      setConversation(res.data)
    })
    .catch(err => {
      console.log(err);
    })
  }
  
  return (
    <div className="bg-[#232327] z-10 h-full basis-1/6 shadow-[0_8px_6px_4px_rgba(0,0,0,0.3)] p-10">
      <h1 className="text-white text-2xl">Contacts: </h1>
      <div>
        {
          contacts?.map(contact => (
            <div key={contact.id} onClick={()=>getConversation(contact.id)} className="text-lg flex items-center cursor-pointer  duration-300 hover:text-white text-[#3e3e45] mt-8">
              <h1 >{contact.users[0].userName}</h1>
            </div>
          ))
        }
      </div>
    </div>
  )
}
