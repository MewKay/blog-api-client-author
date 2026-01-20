import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Markdown from "./markdown";

const markdown = `
  ### This is heading 3

  this is paragraph

  > this is blockquote

  | column a | column b |
  | -------- | -------- |
  | row a    | row b    |
`;

describe("Markdown component", () => {
  it("transforms Markdown text to html", async () => {
    const element = render(<Markdown>{markdown}</Markdown>);

    const heading3 = element.getByRole("heading", {
      name: /this is heading 3/i,
      level: 3,
    });
    const paragraphText = element.getByText("this is paragraph");
    const blockquote = element
      .getByText("this is blockquote")
      .closest("blockquote");
    const table = element.getByRole("table");

    expect(heading3).toBeInTheDocument();
    expect(paragraphText).toBeInTheDocument();
    expect(paragraphText.tagName).toBe("P");
    expect(blockquote).toBeInTheDocument();
    expect(table).toBeInTheDocument();
  });
});
