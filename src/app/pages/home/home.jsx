import paths from "@/app/routes/paths";
import PostList from "@/features/post-list/post-list";
import { Link, useLoaderData } from "react-router-dom";
import { Pencil } from "lucide-react";
import styles from "./home.module.css";

const Home = () => {
  const { posts } = useLoaderData();

  return (
    <main>
      <Link to={paths.newBlogPost.path} className={styles.newPostLink}>
        <Pencil />
        <p>CREATE NEW POST</p>
      </Link>
      <PostList posts={posts} />
    </main>
  );
};

export default Home;
