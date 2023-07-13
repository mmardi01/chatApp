import { User } from "./HomePage"

interface Props {
    users : User[];
}

export default function Users({users} : Props) {

    

    return (
     <div className="bg-[#1e1e22] h-full w-64 shadow-[0_8px_6px_4px_rgba(0,0,0,0.3)] p-10">
            <h1 className="text-white text-3xl">Users:</h1>
            <div>
                {
                    users.map((user: User)=> {
                        return (
                            <div className="text-xl cursor-pointer  duration-300 hover:text-white text-[#3e3e45] mt-8"><p>{user.userName}</p></div>
                        )
                    })
                }
            </div>
        </div>
  )
}
