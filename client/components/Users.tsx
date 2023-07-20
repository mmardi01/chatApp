import axios from "axios";
import { Contact, User } from "./HomePage"
import { AiFillPlusCircle,AiOutlineCheck } from 'react-icons/ai'


interface Props {
    users: User[];
    setContacts : any
}

export default function Users({ users,setContacts }: Props) {

    const createChat = (id: string) => {
        axios.get(`http://localhost:5555/chat/create?id=${id}`,{withCredentials: true})
        .then(res => {
            setContacts((prev: Contact[]) => [...prev,res.data])
            console.log(res.data)
        })
        .catch(err => {
            console.log(err);
        })
    }


    return (
        <div className="bg-[#1e1e22] h-full basis-1/6 shadow-[0_8px_6px_4px_rgba(0,0,0,0.3)] p-10 z-20">
            <h1 className="text-white text-3xl">Users :</h1>
            <div>
                {
                    users.map((user: User) => {
                        return ( !user.friend ?
                            <div key={user.id} onClick={() => {createChat(user.id);user.friend = true}} className="text-xl flex items-center cursor-pointer  duration-300 hover:text-white text-[#3e3e45] mt-8">
                                <p className="w-[100px]">{user.userName}</p>
                                <AiFillPlusCircle />
                            </div>
                            :
                            <div  className="text-xl flex items-center cursor-pointer  duration-300 hover:text-white text-[#3e3e45] mt-8">
                                <p className="w-[100px]">{user.userName}</p>
                                <AiOutlineCheck className="text-green-500"/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
