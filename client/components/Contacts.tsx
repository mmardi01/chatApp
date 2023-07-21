import axios from "axios"
import { useEffect, useState } from "react"
import { Contact } from "./HomePage"
interface Props {
  contacts: Contact[]
  setConversation: any
  setGroupConversation: any
}
export default function Contacts({ contacts,setGroupConversation,setConversation }: Props) {

  const getConversation = (id: string) => {
    axios.get(`http://localhost:5555/chat/get?id=${id}`,{withCredentials: true})
    .then(res=> {
      setConversation(res.data)
      setGroupConversation(null)
    })
    .catch(err => {
      console.log(err);
    })
  }
  
  return (
    <div className="h-[50%] overflow-y-scroll">
      <h1 className="text-white text-2xl">Contacts: </h1>
      <div>
        {
          contacts?.map(contact => (
            <div key={contact.id} onClick={()=>getConversation(contact.id)} className="text-lg flex items-center cursor-pointer  duration-300 hover:text-white text-[#3e3e45] mt-4">
              <h1 >{contact.users[0].userName}</h1>
            </div>
          ))
        }
      </div>
    </div>
  )
}
