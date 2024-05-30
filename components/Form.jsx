import Link from "next/link"


const Form = ({type,post,setPost,submitting,handleSubmit}) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className = "head_text text_left">
          <span className = "blue_gradient">
            {type} Post
          </span>
        </h1>
        <p className = "desc text-left max-w-md">
          {type} and Share amazing prompts with the world and let your imagination run wild with any AI-powered prompt
        </p>

        <form
        onSubmit={handleSubmit}
        className = "mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
        >
          <label>
            <span 
            className = "font-satoshi font-semibold text-base text-gray-700"
            >Your AI Prompt</span>

            <textarea
            className = "form_textarea"
            value = {post.prompt}
            onChange = {(e)=>setPost({...post,prompt:e.target.value})}
            ></textarea>
          </label>

          <label>
            <span 
            className = "font-satoshi font-semibold text-base text-gray-700"
            >Tag {` `}</span>
            <span>(#web, #AI, #product)</span>
            <input
            className = "form_input"
            value = {post.tag}
            onChange = {(e)=>setPost({...post,tag:e.target.value})}
            ></input>

            <div className = "flex-end mx-3 mb-5 gap-4">
              <Link href = "/" className = "text-gray-500 text-sm mt-4">
                Cancel
              </Link>

              <button type = "submit" disabled = {submitting} className = "text-gray-500 text-sm mt-4 bg-orange-500 px-4 py-2 font-semibold text-white rounded-xl hover:bg-orange-600">
                {submitting ? `${type}...` : type}
              </button>
            </div>
          </label>
        </form>
    </section>
  )
}

export default Form