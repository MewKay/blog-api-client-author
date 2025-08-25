import Input from "@/components/input/input";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Form, useNavigate } from "react-router-dom";

const PostForm = ({ postToEdit = null }) => {
  const checkBoxRef = useRef();
  const navigate = useNavigate();

  const [titleValue, setTitleValue] = useState(postToEdit?.title || "");
  const [postTextValue, setPostTextValue] = useState(postToEdit?.text || "");

  useEffect(() => {
    if (postToEdit) {
      checkBoxRef.current.checked = postToEdit.is_published;
    }
  }, [postToEdit]);

  const handleCancelClick = () => {
    return navigate(-1);
  };

  return (
    <Form method={postToEdit ? "PUT" : "POST"}>
      <Input
        type="text"
        name="title"
        value={titleValue}
        setValue={setTitleValue}
      >
        Title
      </Input>

      <textarea
        name="text"
        placeholder="Write your post here..."
        value={postTextValue}
        onChange={(event) => setPostTextValue(event.target.value)}
      ></textarea>

      <Input ref={checkBoxRef} type="checkbox" name="is_published" value="true">
        Publish the post ?
      </Input>

      <button type="reset" onClick={handleCancelClick}>
        Cancel
      </button>
      <button>Submit Post</button>
    </Form>
  );
};

PostForm.propTypes = {
  postToEdit: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
    is_published: PropTypes.bool,
  }),
};

export default PostForm;
