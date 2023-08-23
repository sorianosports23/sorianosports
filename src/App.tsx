import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";
import PageIndex from "./pages/user/PageIndex";
import "./css/global.css"
import "./css/colors.css"
import PageEvents from "./pages/user/PageEvents";
import PageIndexAdmin from "./pages/admin/PageIndexAdmin";
import PageDepartments from "./pages/user/activities/PageDepartments";
import PageSports from "./pages/user/activities/PageSports";

const pageUserRoutes: RouteObject[] = [
  {
    path: "/", element: <PageIndex/>
  },
  {
    path: "/events", element: <PageEvents/>
  },
  {
    path: "/activities/departments", element: <PageDepartments/>
  },
  {
    path: "/activities/sports", element: <PageSports/>
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
