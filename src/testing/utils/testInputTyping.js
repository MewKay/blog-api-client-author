import { expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import setupPageRender from "./setupPageRender";
import routes from "@/app/routes/routes";

const testInputTyping = (cases, routeEntries) => {
  it.each(cases)(
    "should be able to type on $inputName input",
    async ({ inputLabel, inputValue }) => {
      const user = userEvent.setup();
      setupPageRender(routes, routeEntries);

      const inputElement = screen.getByLabelText(inputLabel);
      await user.type(inputElement, inputValue);

      expect(inputElement).toHaveValue(inputValue);
    },
  );
};

export default testInputTyping;
