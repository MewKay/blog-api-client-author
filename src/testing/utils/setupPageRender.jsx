import { render } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

// eslint-disable-next-line react/prop-types, react-refresh/only-export-components
const PageRendered = ({ routes, initialEntries }) => (
  <RouterProvider router={createMemoryRouter(routes, { initialEntries })} />
);

const setupPageRender = (routes, initialEntries) => {
  const page = render(
    <PageRendered routes={routes} initialEntries={initialEntries} />,
  );

  return {
    ...page,
    rerender: () => {
      page.rerender(
        <PageRendered routes={routes} initialEntries={initialEntries} />,
      );
    },
  };
};

export default setupPageRender;
