import Login from "../../components/Login"
import { useState,useEffect } from "react"
import axios from "axios";
import HomePage from "../../components/HomePage";

export default function Home() {
  const [loggedId, setLoggedIn] = useState(false);

  useEffect(()=> {
    axios.get('http://localhost:5555/user/profile',{withCredentials:true})
    .then(res=>{
      setLoggedIn(true)
      console.log(res.data)
    })
    .catch(err => {
      console.log(err);
    })
  },[])

  return (
    <div className="w-full h-full flex justify-center items-center">
      {
        !loggedId ?
        <Login setLoggedIn={setLoggedIn} />
        :
        <HomePage/>
      }
    </div>
  )
}
