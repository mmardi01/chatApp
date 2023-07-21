import Users from "./Users"
import { useEffect, useState } from "react"
import axios from "axios";
import Contacts from "./Contacts";
import ChatBox from "./ChatBox";
import Groups from "./Groups";
import GroupChatBox from "./GroupChatBox";
import AllGroups from "./AllGroups";
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

export interface GroupConversation {
  id: string;
  name:string;
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
  type:string
}




export default function HomePage() {
    
    const [users , setUsers] = useState<User[]>([]);
    const [contacts, setContacts] = useState<Contact[] | null>(null);
    const [groups, setGroups] = useState<Group[] | null>(null);
    const [allGroups, setAllGroups] = useState<Group[] | null>(null);
    const [conversation, setConversation] = useState<Conversation | null>()
    const [groupConversation, setGroupConversation] = useState<GroupConversation | null>()
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
          axios.get("http://localhost:5555/group/search", {
            withCredentials: true,
          })
          .then((res) => {
            setAllGroups(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
    },[])
    
    return (
    <div className="h-full w-full flex">
      <div className="bg-[#1e1e22] h-full basis-1/6 shadow-[0_8px_6px_4px_rgba(0,0,0,0.3)] p-10 z-20">
        <Users users={users} setContacts={setContacts} />
        <AllGroups allGroups={allGroups as Group[]} setGroups={setGroups} />
      </div>
       <div className="bg-[#232327] z-10 h-full basis-1/6 shadow-[0_8px_6px_4px_rgba(0,0,0,0.3)]  p-10">
        <Contacts contacts={contacts as Contact[]} setGroupConversation={setGroupConversation} setConversation={setConversation}/>
        <Groups groups={groups as Group[]} setGroupConversation={setGroupConversation}  setGroups={setGroups} setConversation={setConversation}/>
       </div>
       {
          conversation ? 
         <ChatBox conversation={conversation as Conversation} /> : 
         groupConversation ?
         <GroupChatBox groupConversation={groupConversation as GroupConversation} /> 
          : null
       }
    </div>
  )
}
