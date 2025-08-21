import ProtectedRedirect from "@/components/protected-redirect/protected-redirect";
import PostList from "@/features/post-list/post-list";
import { Link, useLoaderData } from "react-router-dom";

const Home = () => {
  const { posts } = useLoaderData();

  return (
    <ProtectedRedirect>
      <main>
        <Link to={"/new-post"}>CREATE NEW POST</Link>
        <PostList posts={posts} />
      </main>
    </ProtectedRedirect>
  );
};

export default Home;
