import PostList from "@/features/post-list/post-list";
import { Link, useLoaderData } from "react-router-dom";

const Home = () => {
  const { posts } = useLoaderData();

  return (
    <main>
      <Link to={"/new-post"}>CREATE NEW POST</Link>
      <PostList posts={posts} />
    </main>
  );
};

export default Home;
