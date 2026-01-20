import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Markdown = ({
  classNames = { container: "", tableWrapper: "" },
  children,
}) => {
  return (
    <div className={classNames.container}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          table(props) {
            // eslint-disable-next-line no-unused-vars, react/prop-types
            const { node, ...rest } = props;
            return (
              <div className={classNames.tableWrapper}>
                <table {...rest} />
              </div>
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};

Markdown.propTypes = {
  classNames: PropTypes.objectOf(PropTypes.string),
  children: PropTypes.node,
};

export default Markdown;
