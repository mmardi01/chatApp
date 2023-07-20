export default function Groups() {
  return (
    <div className="h-[50%] overflow-y-scroll">
      <div className="left-0 right-0 top-0 bottom-0 backdrop-blur-sm z-10 absolute flex justify-center items-center">

      <div className="w-[300px] h-[400px] bg-[#1a1a1c] shadow-xl rounded-[8px]">
      </div>

      </div>
      <div className="fixed bg-[#232327] mb-4">
        <h1 className="text-white  text-2xl  mb-2">Groups</h1>
        <button className="text-lg flex items-center cursor-pointer  duration-300 hover:text-white text-[#6d6d73]"> + Create Group</button>
      </div>
        <div className="pt-14">
            <div className="text-lg flex items-center cursor-pointer  duration-300 hover:text-white text-[#3e3e45] mt-4">
              group name
            </div>
        </div>
    </div>
  )
}
