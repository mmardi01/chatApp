import { useEffect, useState } from "react"
import { Conversation, Message } from "./HomePage"
import axios from "axios"

export default function ChatBox({conversation}: {conversation:Conversation}) {

  const [message, setMessage] = useState('')
  const [allMessages, setAllMessages] = useState<Message[]>([])
  useEffect(() => {
    setAllMessages(conversation?.messages)
  },[conversation])
  const sendMessage = (e: any) => {
    e.preventDefault()
    axios.post(`http://localhost:5555/chat/send?id=${conversation.id}`,{message:message},{withCredentials:true})
    .then(res=> {
      const msg : Message = res.data
      setAllMessages(() => ([...allMessages,msg]));
      // allMessages.push(msg)
      setMessage('')
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <div className="bg-[#2a2a2e] basis-2/3 h-full  z-0 justify-items-center">
      <div className="h-[94%] p-10">
        {
          allMessages?.map(msg => (
            <div className="flex text-white">
              <h1 className="mx-[10px]">{msg.sender.userName}:</h1>
              <p>{msg.content}</p>
            </div>
          ))
        }
      </div>
      <form className="w-full flex justify-center" onSubmit={sendMessage}>
        <input value={message} type="text" onChange={e => {setMessage(e.target.value)}} placeholder="Send a message" className="w-[90%] text-white text-2xl bg-transparent placeholder:text-2xl outline-none border-b-2 py-3"  />
      </form>
    </div>
  )
}
