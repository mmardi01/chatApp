import { AiFillPlusCircle } from "react-icons/ai";
import { Group } from "./HomePage";
import axios from "axios";
import { useEffect, useState } from "react";

interface Props {
  allGroups: Group[];
  setGroups: any;
}

export default function AllGroups({ allGroups, setGroups }: Props) {
  const [password, setPasword] = useState("");
  const [displayPassword, setDisplayPassword] = useState("");

  const handleSubmit = (id: string) => {
    axios
      .post(
        `http://192.168.8.106:5555/group/join?id=${id}`,
        { password: password },
        { withCredentials: true }
      )
      .then((res) => {
        setGroups((prev: Group[]) => [res.data, ...prev]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const joinGroup = (id: string, type: string) => {
    if (type === "protected") setDisplayPassword(id);
    else {
      handleSubmit(id);
    }
    // setTimeout(() => {

    //     console.log(displayPassword)
    // },1000)
  };

  return (
    <div className="h-[50%]">
      <h1 className="text-white text-2xl">All Groups :</h1>
      {allGroups?.map((group) => (
        <div key={group.id}>
          <div
            onClick={() => joinGroup(group.id, group.type)}
            className="text-xl flex items-center cursor-pointer  duration-300 hover:text-white text-[#3e3e45] mt-8"
          >
            <p className="w-[100px]">{group.name}</p>
            <AiFillPlusCircle />
          </div>
          {group.id === displayPassword ? (
            <form
              className="relative"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(group.id);
              }}
            >
              <input
                onChange={(e) => setPasword(e.target.value)}
                className=" p-1 text-white bg-transparent outline-none border-b-[1px] border-white"
                type="password"
                placeholder="group password"
              />
              <button type="submit" className="absolute right-0 text-gray-400">
                join
              </button>
            </form>
          ) : null}
        </div>
      ))}
    </div>
  );
}
