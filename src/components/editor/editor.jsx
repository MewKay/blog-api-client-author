import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  codeBlockPlugin,
  CodeMirrorEditor,
  codeMirrorPlugin,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
  headingsPlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  Separator,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from "@mdxeditor/editor";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import "@mdxeditor/editor/style.css";

const toolbarPluginConfig = () =>
  toolbarPlugin({
    toolbarContents: () => (
      <DiffSourceToggleWrapper>
        <div className="tools-container">
          <UndoRedo />
          <Separator />
          <BoldItalicUnderlineToggles />
          <Separator />
          <ListsToggle />
          <BlockTypeSelect />
        </div>
      </DiffSourceToggleWrapper>
    ),
  });

const plugins = (initialContent) => [
  headingsPlugin(),
  quotePlugin(),
  listsPlugin(),
  thematicBreakPlugin(),
  linkPlugin(),
  linkDialogPlugin(),
  tablePlugin(),
  markdownShortcutPlugin(),
  codeBlockPlugin({
    codeBlockEditorDescriptors: [
      // eslint-disable-next-line no-unused-vars
      { priority: -10, match: (_) => true, Editor: CodeMirrorEditor },
    ],
  }),
  codeMirrorPlugin({
    codeBlockLanguages: {
      js: "JavaScript",
      jsx: "JavaScript (React)",
      ts: "TypeScript",
      tsx: "TypeScript (React)",
      html: "HTML",
      css: "CSS",
      pythom: "Python",
      markdown: "Markdown",
      null: "Text",
    },
  }),
  diffSourcePlugin({
    viewMode: "rich-text",
    diffMarkdown: initialContent,
    readOnlyDiff: true,
  }),
  toolbarPluginConfig(),
];

const Editor = forwardRef(function Editor(
  { contentEditableClassName, initialContent = "", onChange },
  ref,
) {
  return (
    <MDXEditor
      ref={ref}
      contentEditableClassName={contentEditableClassName}
      markdown={initialContent}
      plugins={plugins(initialContent)}
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
