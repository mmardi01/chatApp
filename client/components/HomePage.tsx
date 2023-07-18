import Users from "./Users"
import { useEffect, useState } from "react"
import axios from "axios";
import Contacts from "./Contacts";
import ChatBox from "./ChatBox";

export interface User {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface Message {
    id: string;
    userId:string;
    sender: User;
    chatId:string;
    content:string;
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

export default function HomePage() {
    
    const [users , setUsers] = useState<User[]>([]);
    const [contacts, setContacts] = useState<Contact[] | null>(null)
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
    },[])
    
    return (
    <div className="h-full w-full flex">
       <Users users={users} />
       <Contacts contacts={contacts as Contact[]} setConversation={setConversation}/>
       {
          conversation ? 
         <ChatBox conversation={conversation as Conversation}/> : null
       }
    </div>
  )
}
