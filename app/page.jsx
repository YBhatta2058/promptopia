import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className = "w-full flex-center flex-col">
        <h1 className = "head_text text-center">Discover and share
        <br/>
        <span className = "orange_gradient text-center">AI-powered Prompts</span>
        </h1>
        <p className = "desc text-center">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos enim tempora amet corporis, deleniti voluptas, libero optio eum vel placeat reprehenderit sed mollitia quae temporibus.
        </p>
        <Feed />
    </section>
  )
}

export default Home