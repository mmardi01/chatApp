import { useRouter } from "next/router"

export default function Login() {
    const router = useRouter()    
    const handleSubmit = () => {
                   
    }
  
    return (
        <div>
            <h1 className="text-white text-6xl font-bold">Sign In</h1>
            <form onSubmit={handleSubmit} className="grid w-[500px] mt-[80px]">
                <input type="text" placeholder="Username" className="text-white text-2xl bg-transparent placeholder:text-2xl border-b-2 py-3 border-white my-[30px] outline-none" />
                <input type="password" placeholder="password" className="text-white text-2xl  bg-transparent placeholder:text-2xl border-b-2 py-3 border-white my-[30px] outline-none" />
                <button className="w-full text-white text-2xl h-[56px] my-[30px] bg-[#4044ED] shadow">Sign In</button>
                <button onClick={(e: any) => {e.preventDefault(); router.push('/register')}} className="w-full bg-white text-2xl h-[56px] my-[10px] text-[#4044ED] shadow">Sign Up</button>
            </form>
        </div>
  )
}
