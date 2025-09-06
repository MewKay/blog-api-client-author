import PropTypes from "prop-types";
import { formatPostDate } from "./post.util";
import { isSameDay } from "date-fns";
import { Link } from "react-router-dom";
import PublishButton from "@/components/publish-button/publish-button";

const Post = ({ post, editPostLink }) => {
  const { title, text, created_at, edited_at, is_published } = post;

  const formattedCreateDate = formatPostDate(created_at);
  const formattedEditDate = formatPostDate(edited_at);
  const isPostEdited = !isSameDay(formattedCreateDate, formattedEditDate);

  return (
    <div>
      <h2>{title}</h2>
      <div>
        <p>
          {formattedCreateDate}
          {isPostEdited && ` ( Last edited ${formattedEditDate} )`}
        </p>
      </div>
      <div>{text}</div>
      <div>
        <Link to={editPostLink}>Edit this post</Link>
        {is_published ? <p>✅️ Published</p> : <PublishButton />}
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    edited_at: PropTypes.string.isRequired,
    is_published: PropTypes.bool.isRequired,
  }),
  editPostLink: PropTypes.string.isRequired,
};

export default Post;
