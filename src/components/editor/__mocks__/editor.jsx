import PropTypes from "prop-types";
import { forwardRef, useImperativeHandle, useRef } from "react";

const Editor = forwardRef(function Editor(
  { contentEditableClassName, initialContent = "", onChange },
  ref,
) {
  const editorRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getMarkdown: () => editorRef.current?.value ?? "",
  }));

  return (
    <textarea
      ref={editorRef}
      className={contentEditableClassName}
      defaultValue={initialContent}
      aria-label="editable markdown"
      role="textbox"
      onChange={onChange}
    />
  );
});

Editor.propTypes = {
  contentEditableClassName: PropTypes.string,
  initialContent: PropTypes.string,
  onChange: PropTypes.func,
};

export default Editor;
