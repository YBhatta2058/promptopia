"use client"
import PromptCard from '@components/PromptCard'
import { useSession } from 'next-auth/react'
import {  useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Profile = () => {
    const params = useSearchParams()
    const userId = params.get('id')
    const [error,setError] = useState(false)
    const [datas,setDatas] = useState(null)
    const { data : session } = useSession()
     const hd = ()=>{
        console.log("Delete han")
    }
    useEffect(()=>{
        const fetchData = async ()=>{
            try{
            const res = await fetch(`http://localhost:3000/api/getPost/user/${userId}`)
            const data = await res.json()
            setDatas(data)
        }
        catch(err){
            setError(true)
        }
        }
        fetchData()
    },[])
  return (
    <div>
        {error && <div>Error while fetching data </div>}
        {
            datas && datas.map((d)=>(
                <PromptCard key = {d._id} tag = {d.tag} prompt = {d.prompt} handleDelete = {hd} deleting = {false} user = {session.user} id = {d._id} self = {true}/>
            ))
        }
    </div>
  )
}

export default Profile
