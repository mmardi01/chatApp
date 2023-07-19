import { useContext, useEffect, useRef, useState } from "react"
import { Conversation, Message } from "./HomePage"
import axios from "axios"
import { socketContext, userContext } from "@/pages"

let lastTimeTiping: number;
export default function ChatBox({conversation}: {conversation:Conversation}) {
  const [message, setMessage] = useState('')
  const [allMessages, setAllMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState<Message | null>(null);
  const [isTyping, setIstyping] = useState(false);
  const user = useContext(userContext);
  const socket = useContext(socketContext);

  useEffect(() => {
    setAllMessages(conversation?.messages)
  },[conversation])
  const sendMessage = (e: any) => {
    e.preventDefault()
    if (message.length === 0)
      return
    axios.post(`http://localhost:5555/chat/send?id=${conversation.id}`,{message:message},{withCredentials:true})
    .then(res => {
      const msg : Message = res.data
      socket?.emit('sendMessage',{message:msg,receiverId:conversation.users[0].id})
      setAllMessages(() => ([msg,...allMessages]));
      setMessage('')
    })
    .catch(err => {
      console.log(err);
    })
  }
  useEffect(()=> {
    socket?.on('receiveMessage',(data)=> {
      const msg : Message = data
      setIstyping(false)
      if(msg.userId === conversation.users[0].id)
        setNewMessage(msg)
    })
    socket?.on("typing", (id) => {
      lastTimeTiping = new Date().getTime()
      console.log(id,conversation.users[0].id)
      if (id === conversation.users[0].id) {
        setIstyping(true);
        setTimeout(() => {
          const now = new Date().getTime()
          const diff = now - lastTimeTiping
          if (diff >= 1000)
          setIstyping(false)
        },1000)
      }
      })
  },[socket])
  useEffect(()=>{
    if(newMessage)
      setAllMessages([newMessage, ...allMessages]);
  },[newMessage])
  const getDate = (date : string) : string =>  {
    const hour = new Date(date).getHours()
    const minutes = new Date(date).getMinutes()
    return `${hour} : ${minutes < 10 ? '0' + minutes : minutes}`
  } 
  return (
    <div className="bg-[#2a2a2e] basis-2/3 h-full z-0 justify-items-center">
      <div className="w-full h-[60px] bg-[#232327] shadow-xl italic text-white font-bold text-2xl  p-3"><h1 className="ml-5">{conversation.users[0].userName}</h1></div>
      <div className="h-[90%]  overflow-y-scroll flex flex-col-reverse p-6 scroll-smooth ">
        {
          isTyping ?
          <p className="text-white">typing...</p> : null
        }
        {allMessages?.map((msg) =>
          user?.id !== msg.userId ? (
            <div
            key={msg.id}
            className="flex text-white   bg-[#858585] my-[10px] rounded-[0px_10px_10px_10px] w-fit p-[10px]  max-w-[60%] "
            >
              <p className="break-all mr-2  max-w-[88%]">{msg.content}</p>
              <p className="break-all text-[10px] ] mt-auto font-bold">{getDate(msg.createdAt)}</p>

            </div>
          ) : (
            <div
            key={msg.id}
            className="flex  text-white  bg-[#4044ED] ml-auto  rounded-[10px_0_10px_10px] w-fit p-[10px] my-[10px] max-w-[60%]"
            >
              <p className="break-all max-w-[88%] mr-2">{msg.content}</p>
              <p className="break-all  text-[10px] mt-auto font-bold">{getDate(msg.createdAt)}</p>
            </div>
          )
          )}
      </div>
      <form className="w-full flex justify-center px-8 relative" onSubmit={sendMessage}>
        <input
          value={message}
          type="text"
          onChange={(e) => {
            socket?.emit('typing',conversation.users[0].id,user?.id)
            setMessage(e.target.value);
          }}
          placeholder="Send a message"
          className="w-[100%] text-white text-2xl bg-transparent placeholder:text-2xl outline-none border-b-2 py-3"
        />
        <button type="submit" className="absolute text-2xl text-white font-bold right-10 top-4">send</button>
      </form>
    </div>
  );
}
