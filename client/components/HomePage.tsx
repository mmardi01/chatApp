import Users from "./Users"
import { useEffect, useState } from "react"
import axios from "axios";

export interface User {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
}

interface Message {
    id: string;
    senderId:string;
    chatId:string;
    content:string;
}

interface Room {
    id: string;
    users: User[];
    messages:Message[];
}

export default function HomePage() {
    
    const [users , setUsers] = useState<User[]>([]);
    const [room, setRoom] = useState<Room | null>(null)
    useEffect(()=> {
        axios.get('http://localhost:3333/user', {withCredentials:true})
        .then(res => {
            setUsers(res.data)
        })
        .catch(err => {
            console.log(err);
        })
    },[])

    return (
    <div className="h-full w-full flex">
       <Users users={users}/>
    </div>
  )
}
