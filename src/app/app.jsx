import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes/router";

const router = createBrowserRouter(routes);

const App = () => <RouterProvider router={router} />;

export default App;
