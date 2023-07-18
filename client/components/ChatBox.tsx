import { useContext, useEffect, useRef, useState } from "react"
import { Conversation, Message } from "./HomePage"
import axios from "axios"
import { userContext } from "@/pages"

export default function ChatBox({conversation}: {conversation:Conversation}) {
  const [message, setMessage] = useState('')
  const [allMessages, setAllMessages] = useState<Message[]>([])
  const user = useContext(userContext);
  useEffect(() => {
    setAllMessages(conversation?.messages)
    // allMessages.reverse()
  },[conversation])
  const sendMessage = (e: any) => {
    e.preventDefault()
    axios.post(`http://localhost:5555/chat/send?id=${conversation.id}`,{message:message},{withCredentials:true})
    .then(res=> {
      const msg : Message = res.data
      setAllMessages(() => ([msg,...allMessages]));
      // allMessages.push(msg)
      setMessage('')
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <div className="bg-[#2a2a2e] basis-2/3 h-full  z-0 justify-items-center">
      <div  className="h-[94%]  overflow-y-scroll flex flex-col-reverse p-6 scroll-smooth">
        {
          allMessages?.map(msg => (
            user?.id !== msg.userId ?
            <div key={msg.id} className="flex text-white   bg-[#858585] my-[10px] rounded-[0px_20px_20px_20px] w-fit p-[10px]  max-w-[60%] ">
              <p className="break-all">{msg.content}</p>
            </div> : 
            <div key={msg.id} className="flex  text-white  bg-[#4044ED] ml-auto  rounded-[20px_0_20px_20px] w-fit p-[10px] my-[10px] max-w-[60%]">
            <p className="break-all">{msg.content}</p>
          </div>
          ))
        }
      </div>
      <form className="w-full flex justify-center px-8" onSubmit={sendMessage}>
        <input value={message} type="text" onChange={e => {setMessage(e.target.value)}} placeholder="Send a message" className="w-[100%] text-white text-2xl bg-transparent placeholder:text-2xl outline-none border-b-2 py-3"  />
      </form>
    </div>
  )
}
