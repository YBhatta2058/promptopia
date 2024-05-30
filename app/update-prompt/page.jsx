"use client"
import Form from "@components/Form"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"


const UpdatePrompt = () => {
    const router = useRouter()
    const [submitting,  setSubmitting] = useState(false)
    const [post,setPost] = useState({
        prompt: '',
        tag: ''
    })

    

    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    useEffect(()=>{
        const updatePrompt = async ()=>{
            const res = await fetch(`/api/prompt/new/${id}`)
            const data = await res.json()
            setPost({prompt: data.prompt , tag: data.tag})
        }

        updatePrompt()
    },[])
    
    const editPrompt = async (e) =>{
        e.preventDefault()
        setSubmitting(true)

        try {
            const res = await fetch(`/api/prompt/updatePrompt/${id}`,{
                method: "PATCH",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })
            if(res.ok){
                setSubmitting(false)
                router.push("/")
            }
        } catch (error) {
            console.log(error)
        } finally{
            setSubmitting(false)
        }
    }
    return (
    <div>
        <Form 
        type = "Edit"
        post = {post}
        setPost = {setPost}
        submitting = {submitting}
        handleSubmit = {editPrompt}
        />
    </div>
  )
}

export default UpdatePrompt