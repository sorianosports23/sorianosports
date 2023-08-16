import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";
import PageIndex from "./pages/user/PageIndex";
import "./css/global.css"
import "./css/colors.css"
import PageEvents from "./pages/user/PageEvents";
import PageIndexAdmin from "./pages/admin/PageIndexAdmin";

const pageUserRoutes: RouteObject[] = [
  {
    path: "/", element: <PageIndex/>
  },
  {
    path: "/events", element: <PageEvents/>
  }
]

const pageAdminRoutes: RouteObject[] = [
  {
    path: "/admin/", element: <PageIndexAdmin/>
  }
]

const pageRoutes = createBrowserRouter([...pageUserRoutes, ...pageAdminRoutes])



const App = () => <RouterProvider router={pageRoutes}/>


export default App;
