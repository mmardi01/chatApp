import axios from "axios";
import { Contact, User } from "./HomePage"
import { AiFillPlusCircle } from 'react-icons/ai'
import { connect } from "http2";
interface Props {
    users: User[];
}

export default function Users({ users }: Props) {

    const createChat = (id: string) => {
        axios.get(`http://localhost:5555/chat/create?id=${id}`,{withCredentials: true})
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }


    return (
        <div className="bg-[#1e1e22] h-full basis-1/6 shadow-[0_8px_6px_4px_rgba(0,0,0,0.3)] p-10 z-20">
            <h1 className="text-white text-3xl">Users:</h1>
            <div>
                {
                    users.map((user: User) => {
                        return (
                            <div key={user.id} onClick={() => createChat(user.id)} className="text-xl flex items-center cursor-pointer  duration-300 hover:text-white text-[#3e3e45] mt-8">
                                <p className="w-[100px]">{user.userName}</p>
                                <AiFillPlusCircle />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
