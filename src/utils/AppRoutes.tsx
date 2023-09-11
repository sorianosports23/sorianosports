import { Link, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Error from "../pages/Error"
import Index from "../pages/user/Index"
import Events from "../pages/user/Events"
import Departments from "../pages/user/activities/Citys"
import Sports from "../pages/user/activities/Sports"
import Schools from "../pages/user/activities/Schools"
import Sport from "../pages/user/Sport"
import sportLoader from "./routes/sportLoader"
import Register from "../pages/session/Register"
import Login from "../pages/session/Login"
import IndexAdmin from "../pages/admin/IndexAdmin"
import Account from "../pages/session/Account"
import Faq from "../pages/user/Faq"
import MissionVission from "../pages/user/institution/MissionVission"
import Users from "../pages/admin/Users"
import SportsAdmin from "../pages/admin/Sports"
import News from "../pages/user/News"
import EventsAdmin from "../pages/admin/Events"
import Contact from "../pages/user/Contact"

const pageUserRoutes = createRoutesFromElements(
  <Route path="/" errorElement={<Error/>}>
    <Route index element={<Index/>}/>
    <Route path="eventos" element={<Events/>}/>
    <Route path="actividades">
      <Route path="ciudades" element={<Departments/>}/>
      <Route path="deportes" element={<Sports/>}/>
      <Route path="escuelas" element={<Schools/>}/>
    </Route>
    <Route path="noticias" element={<News/>}/>

    <Route path="info/:city/:sport" element={<Sport/>} loader={sportLoader}/>
    <Route path="faq" element={<Faq/>}/>

 


    <Route path="auth">
      <Route path="registro" element={<Register/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="perfil" element={<Account/>}/>
    </Route>

    <Route path="acerca">
      <Route path="misionvision" element={<MissionVission/>}/>
       <Route path="contacto" element={<Contact/>}/>
    </Route>

    <Route path="/admin" errorElement={<Error/>}>
      <Route index element={<IndexAdmin/>} />
      <Route path="users" element={<Users/>} />
      <Route path="sports" element={<SportsAdmin/>}/>
      <Route path="events" element={<EventsAdmin/>}/>
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
    element: <Error/>
  },
], {
  basename: "/deportes"
})

export default pageRoutes