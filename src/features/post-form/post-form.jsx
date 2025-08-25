import Input from "@/components/input/input";
import ranges from "@/lib/validation/ranges";
import postSchema from "@/lib/validation/schema/post-schema";
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

  const { errors, isFormValid } = postSchema.validateInputs({
    title: titleValue,
    text: postTextValue,
  });

  const isPostTextNotEmpty = postTextValue !== "";

  return (
    <Form method={postToEdit ? "PUT" : "POST"}>
      <Input
        type="text"
        name="title"
        value={titleValue}
        setValue={setTitleValue}
        minLength={ranges.postTitle.min}
        maxLength={ranges.postTitle.max}
        errorMessage={errors.title}
        required
      >
        Title
      </Input>

      <div>
        <textarea
          name="text"
          placeholder="Write your post here..."
          value={postTextValue}
          onChange={(event) => setPostTextValue(event.target.value)}
          minLength={ranges.postText.min}
          maxLength={ranges.postText.max}
          required
        ></textarea>
        <p>{isPostTextNotEmpty && errors.text}</p>
      </div>

      <Input
        ref={checkBoxRef}
        type="checkbox"
        name="is_published"
        value="true"
        setValue={() => {}}
      >
        Publish the post ?
      </Input>

      <button type="reset" onClick={handleCancelClick}>
        Cancel
      </button>
      <button disabled={!isFormValid}>Submit Post</button>
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
