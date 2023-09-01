import { createBrowserRouter, createRoutesFromElements, Link, Route, RouteObject, RouterProvider } from "react-router-dom";
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
import sportLoader from "./utils/routes/sportLoader";
import PageRegister from "./pages/session/PageRegister";

// const pageUserRoutes: RouteObject[] = [
//   {
//     path: "/", element: <PageIndex/>, 
//   },
//   {
//     path: "/eventos", element: <PageEvents/>, 
//   },
//   {
//     path: "/actividades/ciudades", element: <PageDepartments/>, 
//   },
//   {
//     path: "/actividades/deportes", element: <PageSports/>, 
//   },
//   {
//     path: "/actividades/escuelas", element: <PageSchools/>
//   },
//   {
//     path: "/:city/:sport", element: <PageSport/>, loader: sportLoader, errorElement: <PageError/>
//   }
// ]

const pageUserRoutes = createRoutesFromElements(
  <Route path="/" errorElement={<PageError/>}>
    <Route index element={<PageIndex/>}/>
    <Route path="eventos" element={<PageEvents/>}/>
    <Route path="actividades">
      <Route path="ciudades" element={<PageDepartments/>}/>
      <Route path="deportes" element={<PageSports/>}/>
      <Route path="escuelas" element={<PageSchools/>}/>
    </Route>
    <Route path=":city/:sport" element={<PageSport/>} loader={sportLoader}/>

    <Route path="/auth">
      <Route path="registro" element={<PageRegister/>}/>
    </Route>
  </Route>
)

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
  },
], {
  basename: "/deportes"
})

const App = () => <RouterProvider router={pageRoutes} fallbackElement={<PageLoading/>}/>


export default App;
