import { createBrowserRouter, Link, RouteObject, RouterProvider } from "react-router-dom";
import PageIndex from "./pages/user/PageIndex";
import "./css/global.css"
import "./css/colors.css"
import PageEvents from "./pages/user/PageEvents";
import PageIndexAdmin from "./pages/admin/PageIndexAdmin";
import PageDepartments from "./pages/user/activities/PageDepartments";
import PageSports from "./pages/user/activities/PageSports";
import PageLoading from "./pages/PageLoading";
import PageError from "./pages/PageError";
import PageSchools from "./pages/user/activities/PageSchools";
import PageSport from "./pages/user/PageSport";

const pageUserRoutes: RouteObject[] = [
  {
    path: "/", element: <PageIndex/>, 
  },
  {
    path: "/eventos", element: <PageEvents/>, 
  },
  {
    path: "/actividades/ciudades", element: <PageDepartments/>, 
  },
  {
    path: "/actividades/deportes", element: <PageSports/>, 
  },
  {
    path: "/actividades/escuelas", element: <PageSchools/>
  },
  {
    path: "/deporte/:city/:sport", element: <PageSport/>
  }
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
  },
  {
    path: "/error",
    element: <PageError/>
  }
], {
  basename: "/deportes"
})

const App = () => <RouterProvider router={pageRoutes} fallbackElement={<PageLoading/>}/>


export default App;
