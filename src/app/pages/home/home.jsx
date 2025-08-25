import paths from "@/app/routes/paths";
import PostList from "@/features/post-list/post-list";
import { Link, useLoaderData } from "react-router-dom";

const Home = () => {
  const { posts } = useLoaderData();

  return (
    <main>
      <Link to={paths.newBlogPost.path}>CREATE NEW POST</Link>
      <PostList posts={posts} />
    </main>
  );
};

export default Home;
