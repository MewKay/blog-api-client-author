import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import { AuthProvider } from "@/context/auth.context";

const router = createBrowserRouter(routes);

const App = () => (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

export default App;
