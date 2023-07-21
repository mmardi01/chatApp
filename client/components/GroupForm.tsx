import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

interface Props {
  setDisplayGroupForm: any
}

export default function GroupForm({ setDisplayGroupForm } : Props) {
  const [groupForm, setGroupForm] = useState({
    name: "",
    type: "",
    password: "",
  });
  const [enablePassword, setEnablePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (groupForm.type === "protected") setEnablePassword(true);
    else setEnablePassword(false);
  }, [groupForm.type]);

  const createGroup = (e: any) => {
    e.preventDefault();
    console.log(groupForm)
    axios.post("http://localhost:5555/group/create", groupForm, { withCredentials: true })
      .then((res) => {
        console.log(res.data, "group created");
        setDisplayGroupForm(false)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form
      onSubmit={createGroup}
      className="w-full flex flex-col items-center p-2 h-full justify-center"
    >
      <input
        type="text"
        onChange={(e) => {
          setGroupForm({ ...groupForm, name: e.target.value });
        }}
        placeholder="Group Name"
        className="text-white text-2xl  bg-transparent placeholder:text-2xl border-b-2 py-3 border-white my-[50px] outline-none w-[80%]"
      />
      <label className="text-white mt-[50px] text-2xl font-bold" htmlFor="type">
        Select group type :
      </label>
      <select
        id="type"
        defaultValue={1}
        onChange={(e) => {
          console.log(e.target.value);
          setGroupForm({ ...groupForm, type: e.target.value });
        }}
        className=" text-white text-2xl  bg-transparent placeholder:text-2xl border-b-2 py-3 border-white mb-[50px] outline-none w-[80%]"
      >
        <option className="text-black text-2xl" value="public">
          Public
        </option>
        <option className="text-black text-2xl" value="protected">
          Protected
        </option>
        <option className="text-black text-2xl" value="private">
          Private
        </option>
      </select>
      <div className="w-full flex justify-center  relative my-[50px]">
        <input
          disabled={!enablePassword}
          type={showPassword ? "text" : "password"}
          className="text-white text-2xl disabled:opacity-10 w-[80%] bg-transparent placeholder:text-2xl border-b-2 py-3 border-white  outline-none"
          placeholder="Group Password"
          onChange={(e) =>
            setGroupForm({ ...groupForm, password: e.target.value })
          }
        />
        {showPassword ? (
          <HiEyeOff
            onClick={() => setShowPassword(false)}
            className="absolute cursor-pointer text-2xl text-gray-500 top-3 right-[60px]"
          />
        ) : (
          <HiEye
            onClick={() => setShowPassword(true)}
            className="absolute cursor-pointer text-2xl text-gray-500 top-3 right-[60px]"
          />
        )}
      </div>
      <button
        type="submit"
        className=" text-white text-2xl h-[56px] my-[50px] w-[80%] bg-[#4044ED] shadow"
      >
        Create
      </button>
    </form>
  );
}
