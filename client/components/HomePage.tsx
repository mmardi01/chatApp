import Users from "./Users"
import { useEffect, useState } from "react"
import axios from "axios";
import Contacts from "./Contacts";
import ChatBox from "./ChatBox";
import Groups from "./Groups";
export interface User {
    id: string;
    userName: string;
    friend: boolean;
}

export interface Message {
    id: string;
    userId:string;
    sender: User;
    chatId:string;
    content:string;
    createdAt:string
}

export interface Conversation {
  id: string;
  users: User[];
  messages: Message[]
}

export interface Contact {
    id: string;
    users: User[];
}

export interface Group {
  id: string;
  name: string;
}

export default function HomePage() {
    
    const [users , setUsers] = useState<User[]>([]);
    const [contacts, setContacts] = useState<Contact[] | null>(null);
    const [groups, setGroups] = useState<Group[] | null>(null);
    const [conversation, setConversation] = useState<Conversation>()
    useEffect(()=> {
        axios.get('http://localhost:5555/user', {withCredentials:true})
        .then(res => {
            setUsers(res.data)
        })
        .catch(err => {
            console.log(err);
        })
        axios.get('http://localhost:5555/chat/contacts',{withCredentials:true})
        .then(res=> {
          setContacts(res.data);
        })
        .catch(err=> {
          console.log(err);
        })
        axios.get("http://localhost:5555/group/getmygroups", {
            withCredentials: true,
          })
          .then((res) => {
            setGroups(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
    },[])
    
    return (
    <div className="h-full w-full flex">
       <Users users={users} setContacts={setContacts} />
       <div className="bg-[#232327] z-10 h-full basis-1/6 shadow-[0_8px_6px_4px_rgba(0,0,0,0.3)]  p-10">
        <Contacts contacts={contacts as Contact[]} setConversation={setConversation}/>
        <Groups groups={groups as Group[]}/>
       </div>
       {
          conversation ? 
         <ChatBox conversation={conversation as Conversation}/> : null
       }
    </div>
  )
}
