import React, { useState } from 'react'

export default function GroupForm() {
    const [groupForm, setGroupForm] = useState({
        name:"",
        type:"",
        password:"",
    })
    const createGroup = () => {

    }

    return (
        <form onSubmit={createGroup}>
            <select onChange={(e) => {setGroupForm({...groupForm()})}} className="bg-transparent text-white">
                <option value="Public">Public</option>
                <option value="Protected">Protected</option>
                <option selected value="Private">Private</option>
            </select>
        </form>
    )
}
