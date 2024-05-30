"use client"
import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard'

const Feed = () => {
  const [posts,setPosts] = useState(null)
  const [deleting,setDeleting] = useState(false)
  const [val,setVal] = useState('')
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const res = await fetch('/api/getPost/all');
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  },[])

  const handleDelete = async (id)=>{
    try{
      setDeleting(true)
      const res = await fetch(`/api/prompt/deletePost/${id}`,{
        method:'DELETE'
      })
      if(res.ok){
        setPosts(prevpost => prevpost.filter(post => post._id !== id))
        setDeleting(false)
      }
    }catch(err){
      setDeleting(false)
      console.log("Error while deleting")
    }finally{
      setDeleting(false)
    }
    
  }

  return (
    <section className = "w-full text-center">
      <input type="text" placeholder = "Search Prompts"
        className = "px-4 py-2 outline-none mt-4"
        value = {val}
        onChange = {(e)=>setVal(e.target.value)}
        />
    
    <div className = "grid sm:grid-cols-2">
      {posts && posts.map((post)=>(
        <PromptCard query = {val} id = {post._id} deleting = {deleting} tag = {post.tag} prompt = {post.prompt} user = {post.user} handleDelete = {handleDelete} />
      ))}
    </div>
    </section>
  )
}

export default Feed