import { Link, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import PageError from "../pages/PageError"
import PageIndex from "../pages/user/PageIndex"
import PageEvents from "../pages/user/PageEvents"
import PageDepartments from "../pages/user/activities/PageDepartments"
import PageSports from "../pages/user/activities/PageSports"
import PageSchools from "../pages/user/activities/PageSchools"
import PageSport from "../pages/user/PageSport"
import sportLoader from "./routes/sportLoader"
import PageRegister from "../pages/session/PageRegister"
import PageLogin from "../pages/session/PageLogin"
import PageIndexAdmin from "../pages/admin/PageIndexAdmin"
import PageAccount from "../pages/session/PageAccount"

const pageUserRoutes = createRoutesFromElements(
  <Route path="/" errorElement={<PageError/>}>
    <Route index element={<PageIndex/>}/>
    <Route path="eventos" element={<PageEvents/>}/>
    <Route path="actividades">
      <Route path="ciudades" element={<PageDepartments/>}/>
      <Route path="deportes" element={<PageSports/>}/>
      <Route path="escuelas" element={<PageSchools/>}/>
    </Route>

    <Route path="info/:city/:sport" element={<PageSport/>} loader={sportLoader}/>

    <Route path="/auth">
      <Route path="registro" element={<PageRegister/>}/>
      <Route path="login" element={<PageLogin/>}/>
      <Route path="perfil" element={<PageAccount/>}/>
    </Route>

    <Route path="/admin" errorElement={<PageError/>}>
      <Route index element={<PageIndexAdmin/>} />
    </Route>
  </Route>
)


const pageRoutes = createBrowserRouter(
[
  ...pageUserRoutes,
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

export default pageRoutes