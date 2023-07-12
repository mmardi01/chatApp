import { useRouter } from "next/router";
export default function register() {
    const router = useRouter()

  return (
    <div className="w-full h-full flex justify-center items-center">
            <div>
            <h1 className="text-white text-6xl font-bold">Sign Up</h1>
            <form className="grid w-[500px] mt-[80px]">
                <div className="flex justify-between" >
                    <input type="text" placeholder="First Name" className="text-white text-2xl w-[45%] bg-transparent placeholder:text-2xl border-b-2 py-3 border-white my-[30px] outline-none" />
                    <input type="text" placeholder="Last Name" className="text-white text-2xl  w-[45%] bg-transparent placeholder:text-2xl border-b-2 py-3 border-white my-[30px] outline-none" />
                </div>
                <input type="text" placeholder="Username" className="text-white text-2xl bg-transparent placeholder:text-2xl border-b-2 py-3 border-white my-[30px] outline-none" />
                <input type="email" placeholder="Email" className="text-white text-2xl bg-transparent placeholder:text-2xl border-b-2 py-3 border-white my-[30px] outline-none" />
                <input type="password" placeholder="password" className="text-white text-2xl  bg-transparent placeholder:text-2xl border-b-2 py-3 border-white my-[30px] outline-none" />
                <button className="w-full text-white text-2xl h-[56px] my-[30px] bg-[#4044ED] shadow">Sign Up</button>
                <button onClick={(e: any) => {e.preventDefault(); router.push('/')}} className="w-full bg-white text-2xl h-[56px] my-[10px] text-[#4044ED] shadow">Sing In</button>
            </form>
        </div>
    </div>
  )
}
