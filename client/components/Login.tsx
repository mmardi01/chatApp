import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

interface User {
  userName: string;
  password: string;
}
export default function Login({ setLoggedIn }: any) {
  const router = useRouter();
  const [input, setInput] = useState<User>({
    userName: "",
    password: "",
  });
  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post("http://192.168.8.106:5555/auth/signin", input, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1 className="text-white text-6xl font-bold">Sign In</h1>
      <form onSubmit={handleSubmit} className="grid w-[500px] mt-[80px]">
        <input
          onChange={(e: any) => {
            setInput({ ...input, userName: e.target.value });
          }}
          type="text"
          placeholder="Username"
          className="text-white text-2xl bg-transparent placeholder:text-2xl border-b-2 py-3 border-white my-[30px] outline-none"
        />
        <input
          onChange={(e: any) => {
            setInput({ ...input, password: e.target.value });
          }}
          type="password"
          placeholder="password"
          className="text-white text-2xl  bg-transparent placeholder:text-2xl border-b-2 py-3 border-white my-[30px] outline-none"
        />
        <button
          type="submit"
          className="w-full text-white text-2xl h-[56px] my-[30px] bg-[#4044ED] shadow"
        >
          Sign In
        </button>
        <button
          onClick={(e: any) => {
            e.preventDefault();
            router.push("/register");
          }}
          className="w-full bg-white text-2xl h-[56px] my-[10px] text-[#4044ED] shadow"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
