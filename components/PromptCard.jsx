import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const PromptCard = ({ tag, prompt, user, handleDelete, id, deleting, self = false, query = "" }) => {
  const { data: session } = useSession()
  let isUser = session?.user?.id == user.userId
  const router = useRouter()
  const [show, setShow] = useState(false)

  useEffect(()=>{
    if(query == "" || prompt.includes(query) || tag.includes(query)){
      setShow(true)
    }else{
      setShow(false)
    }
  },[query])
  const handleEdit = (id) => {
    router.push(`/update-prompt/?id=${id}`)
  }
  return (
    <section>
      {(show || query == "" ) && 
    <div className="m-4 p-4 border border-blue-500 glassmorphism">
      <div>
        {prompt}
      </div>
      <div className="text-right">
        #{tag}
      </div>

      <div className="flex justify-between mt-4">
        <div className="flex gap-2">
          {isUser || self && <button className="bg-orange-500 hover:bg-orange-600 px-4 rounded-xl py-1 text-white" onClick={() => handleDelete(id)}>
            {deleting ? <>Deleting Post</> : <>Delete Post</>}

          </button>}
          {isUser || self && <button className="bg-green-500 hover:bg-orange-600 px-4 rounded-xl py-1 text-white" onClick={() => handleEdit(id)}>Edit Post</button>}
        </div>
        <div className={`text-right flex justify-end item-center gap-2 ${isUser ? "" : "w-full"}`}>
          <img className="rounded-full w-7 h-7" src={user?.userImage || user.image} alt="" />
          {user?.username || user.name}
        </div>
      </div>
    </div>}
    </section>
  )
}

export default PromptCard