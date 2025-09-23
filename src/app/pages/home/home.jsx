import paths from "@/app/routes/paths";
import PostList from "@/features/post-list/post-list";
import { Link, useLoaderData } from "react-router-dom";
import { Pencil } from "lucide-react";
import styles from "./home.module.css";
import ScrollButton from "@/components/scroll-button/scroll-button";
import useScrollButtonVisibility from "@/hooks/useScrollButtonVisibility";

const Home = () => {
  const { posts } = useLoaderData();
  const scrollButtonVisibility = useScrollButtonVisibility();

  return (
    <main>
      <Link to={paths.newBlogPost.path} className={styles.newPostLink}>
        <Pencil />
        <p>CREATE NEW POST</p>
      </Link>
      <PostList posts={posts} />
      <ScrollButton isVisible={scrollButtonVisibility} />
    </main>
  );
};

export default Home;
