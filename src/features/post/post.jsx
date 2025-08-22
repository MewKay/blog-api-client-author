import PropTypes from "prop-types";
import { formatPostDate } from "./post.util";
import { isSameDay } from "date-fns";

const Post = ({ post }) => {
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
        {is_published ? <p>✅️ Published</p> : <p>❎️ Unpublished</p>}
      </div>
      <div>{text}</div>
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
};

export default Post;
