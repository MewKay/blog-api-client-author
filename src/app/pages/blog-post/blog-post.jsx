import paths from "@/app/routes/paths";
import ActionErrorMessages from "@/components/action-error-messages/action-error-messages";
import CommentList from "@/features/comment-list/comment-list";
import Post from "@/features/post/post";
import {
  Link,
  useActionData,
  useLoaderData,
  useParams,
} from "react-router-dom";
import styles from "./blog-post.module.css";
import { ChevronLeft } from "lucide-react";
import ScrollButton from "@/components/scroll-button/scroll-button";
import useScrollButtonVisibility from "@/hooks/useScrollButtonVisibility";

const BlogPost = () => {
  const { post, comments } = useLoaderData();
  const actionData = useActionData();
  const scrollButtonVisibility = useScrollButtonVisibility();
  const { encodedId, slug } = useParams();
  const editPostLink = paths.editBlogPost.getHref(encodedId, slug);

  return (
    <main>
      <ActionErrorMessages actionData={actionData} />
      <Link className={styles.goBackLink} to={paths.home.path}>
        <ChevronLeft />
        <p>Back to blog list</p>
      </Link>
      <Post post={post} editPostLink={editPostLink} />
      <CommentList comments={comments} />
      <ScrollButton isVisible={scrollButtonVisibility} />
    </main>
  );
};

export default BlogPost;
