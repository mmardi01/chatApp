import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";


interface Input {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
}

export default function Register() {
  const router = useRouter();
  const [input, setInput] = useState<Input>({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault()
    axios.post('http://localhost:3333/auth/signup',input,{withCredentials:true})
    .then(res => {
      console.log(res);
      router.push('/')
    })
    .catch(err=> {
      console.log(err);
    })
  }


  return (
    <div className="w-full h-full flex justify-center items-center">
      <div>
        <h1 className="text-white text-6xl font-bold">Sign Up</h1>
        <form onSubmit={handleSubmit} className="grid w-[500px] mt-[80px]">
          <div className="flex justify-between">
            <input
              onChange={(e: any) => {
                setInput({ ...input, firstName: e.target.value });
              }}
              type="text"
              placeholder="First Name"
              className="text-white text-2xl w-[45%] bg-transparent placeholder:text-2xl border-b-2 py-3 border-white my-[30px] outline-none"
            />
            <input
              onChange={(e: any) => {
                setInput({ ...input, lastName: e.target.value });
              }}
              type="text"
              placeholder="Last Name"
              className="text-white text-2xl  w-[45%] bg-transparent placeholder:text-2xl border-b-2 py-3 border-white my-[30px] outline-none"
            />
          </div>
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
              setInput({ ...input, email: e.target.value });
            }}
            type="email"
            placeholder="Email"
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
          <button type="submit" className="w-full text-white text-2xl h-[56px] my-[30px] bg-[#4044ED] shadow">
            Sign Up
          </button>
          <button
            onClick={(e: any) => {
              e.preventDefault();
              router.push("/");
            }}
            className="w-full bg-white text-2xl h-[56px] my-[10px] text-[#4044ED] shadow"
          >
            Sing In
          </button>
        </form>
      </div>
    </div>
  );
}
