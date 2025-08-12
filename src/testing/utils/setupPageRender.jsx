import { render } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

const setupPageRender = (routes, initialEntries) => {
  const router = createMemoryRouter(routes, { initialEntries });
  render(<RouterProvider router={router} />);
};

export default setupPageRender;
