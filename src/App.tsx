import { createBrowserRouter, Link, RouteObject, RouterProvider } from "react-router-dom";
import PageIndex from "./pages/user/PageIndex";
import "./css/global.css"
import "./css/colors.css"
import PageEvents from "./pages/user/PageEvents";
import PageIndexAdmin from "./pages/admin/PageIndexAdmin";
import PageDepartments from "./pages/user/activities/PageDepartments";
import PageSports from "./pages/user/activities/PageSports";
import PageLoading from "./pages/PageLoading";

const pageUserRoutes: RouteObject[] = [
  {
    path: "/", element: <PageIndex/>, 
  },
  {
    path: "/events", element: <PageEvents/>, 
  },
  {
    path: "/activities/departments", element: <PageDepartments/>, 
  },
  {
    path: "/activities/sports", element: <PageSports/>, 
  },
]

const pageAdminRoutes: RouteObject[] = [
  {
    path: "/admin/", element: <PageIndexAdmin/>
  }
]

// const pageRoutes = process.env.NODE_ENV === "development" 
//   ? createBrowserRouter([...pageUserRoutes, ...pageAdminRoutes])
//   : createHashRouter([...pageUserRoutes, ...pageAdminRoutes])

const pageRoutes = createBrowserRouter(
[
  ...pageUserRoutes, 
  ...pageAdminRoutes, 
  {
  path: "*",
  element: <div>Not found... (<Link to="/">Go to /</Link>)</div>
}
], {
  basename: "/deportes"
})

const App = () => <RouterProvider router={pageRoutes} fallbackElement={<PageLoading/>}/>


export default App;
