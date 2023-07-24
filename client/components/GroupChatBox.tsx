import { socketContext, userContext } from "@/pages";
import { GroupConversation, Message } from "./HomePage";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

interface Props {
  groupConversation: GroupConversation;
}

export default function GroupChatBox({ groupConversation }: Props) {
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const user = useContext(userContext);
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState<Message | null>(null);

  const socket = useContext(socketContext);

  useEffect(() => {
    setAllMessages(groupConversation?.messages);
  }, [groupConversation]);
  const sendMessage = (e: any) => {
    e.preventDefault();
    if (message.length === 0) return;
    axios
      .post(
        `http://192.168.8.106:5555/group/send?id=${groupConversation.id}`,
        { message: message },
        { withCredentials: true }
      )
      .then((res) => {
        const msg: Message = res.data;
        console.log(msg);
        socket?.emit("sendMessage", msg);
        setAllMessages(() => [msg, ...allMessages]);
        setMessage("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    socket?.on("receiveMessage", (data) => {
      const msg: Message = data;
      console.log(msg);
      if (msg.groupId === groupConversation.id) setNewMessage(msg);
    });
  }, [socket]);
  useEffect(() => {
    if (newMessage) setAllMessages([newMessage, ...allMessages]);
  }, [newMessage]);

  const getDate = (date: string): string => {
    const hour = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();
    return `${hour} : ${minutes < 10 ? "0" + minutes : minutes}`;
  };

  return (
    <div className="bg-[#2a2a2e] basis-2/3 h-full z-0 justify-items-center">
      <div className="w-full h-[60px] bg-[#232327] shadow-xl italic text-white font-bold text-2xl fixed  p-3">
        <h1 className="ml-5">{groupConversation.name}</h1>
      </div>
      <div className="h-[92%]  overflow-y-scroll flex flex-col-reverse p-6 scroll-smooth ">
        {allMessages?.map((msg) =>
          user?.id !== msg.userId ? (
            <div
              key={msg.id}
              className="flex text-white   bg-[#858585] my-[10px] rounded-[0px_10px_10px_10px] w-fit p-[10px]  max-w-[60%] "
            >
              <p className="break-all mr-2  max-w-[88%] text-[#555]">
                {msg.sender.userName}:{" "}
              </p>
              <p className="break-all mr-2  max-w-[88%]">{msg.content}</p>
              <p className="break-all text-[10px] ] mt-auto font-bold">
                {getDate(msg.createdAt)}
              </p>
            </div>
          ) : (
            <div
              key={msg.id}
              className="flex  text-white  bg-[#4044ED] ml-auto  rounded-[10px_0_10px_10px] w-fit p-[10px] my-[10px] max-w-[60%]"
            >
              <p className="break-all max-w-[88%] mr-2">{msg.content}</p>
              <p className="break-all  text-[10px] mt-auto font-bold">
                {getDate(msg.createdAt)}
              </p>
            </div>
          )
        )}
      </div>
      <form
        className="w-full flex justify-center px-8 relative"
        onSubmit={sendMessage}
      >
        <input
          value={message}
          type="text"
          onChange={(e) => {
            // socket?.emit('typing',groupConversation.id,user?.id)
            setMessage(e.target.value);
          }}
          placeholder="Send a message"
          className="w-[100%] text-white text-2xl bg-transparent placeholder:text-2xl outline-none border-b-2 py-3"
        />
        <button
          type="submit"
          className="absolute text-2xl text-white font-bold right-10 top-4"
        >
          send
        </button>
      </form>
    </div>
  );
}
