import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Error from "../pages/Error"
import Index from "../pages/user/Index"
import Events from "../pages/user/Events"
import Departments from "../pages/user/activities/Citys"
import Sports from "../pages/user/activities/Sports"
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
import Directive from "../pages/user/institution/Directive"
import ReadNews from "../pages/user/ReadNews"
import readNewsLoader from "./routes/readNewsLoader"
import Inscription from "../pages/user/Inscription"
import Err404 from "../pages/404"
import NewsAdmin from "../pages/admin/News"
import AddNews from "../pages/admin/AddNews"
import Page from "../pages/admin/Page"
import EventID from "../pages/user/EventID"

//! Admin routes
import AdminContact from "../pages/admin/Contact"
import AdminInscriptions from "../pages/admin/Inscription"
//! 

//! Admin routes (Edit)
import AdminDirective from "../pages/admin/edit/Directive"
import AdminKeywords from "../pages/admin/edit/Keywords"
import AdminSocial from "../pages/admin/edit/Social"
import AdminCity from "../pages/admin/edit/EditCity"
import AdminFaq from "../pages/admin/edit/Faq"
//!

//! ADMIN routes (Add)
import AddDirective from "../pages/admin/add/Directive"
import AddEvent from "../pages/admin/add/Event"
import AddSearch from "../pages/admin/add/Search"
import InscriptionID from "../pages/admin/InscriptionID"
import eventLoader from "./routes/eventLoader"
import AddFaq from "../pages/admin/add/Faq"
//!

const pageUserRoutes = createRoutesFromElements(
  <Route path="/" errorElement={<Error/>}>
    <Route index element={<Index/>}/>
    
    <Route path="eventos" element={<Events/>}/>
    <Route path="evento/:id" element={<EventID/>} loader={eventLoader}/>
    
    <Route path="actividades">
      <Route path="ciudades" element={<Departments/>}/>
      <Route path="deportes" element={<Sports/>}/>
    </Route>
    
    <Route path="noticias">
      <Route index element={<News/>}/>
      <Route path="leer/:id" element={<ReadNews/>} loader={readNewsLoader}/>
    </Route>


    <Route path="info/:city/:sport" element={<Sport/>} loader={sportLoader}/>
    <Route path="faq" element={<Faq/>}/>

    <Route path="inscripcion" element={<Inscription/>}/>


    <Route path="auth">
      <Route path="registro" element={<Register/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="perfil" element={<Account/>}/>
    R</Route>

    <Route path="acerca">
      <Route path="misionvision" element={<MissionVission/>}/>
      <Route path="contacto" element={<Contact/>}/>
      <Route path="directiva" element={<Directive/>}/>
    </Route>

    <Route path="/admin" errorElement={<Error/>}>
      <Route index element={<IndexAdmin/>} />
      <Route path="users" element={<Users/>} />
      <Route path="sports">
        <Route element={<SportsAdmin/>} index/>
        <Route path=":city" element={<AdminCity/>}/>
      </Route>
      <Route path="events" element={<EventsAdmin/>}/>
      <Route path="page" element={<Page/>}/>
      <Route path="news">
        <Route index element={<NewsAdmin/>}/>
        <Route path="add" element={<AddNews/>}/>
      </Route>
      <Route path="edit">
        <Route path="directive" element={<AdminDirective/>}/>
        <Route path="keywords" element={<AdminKeywords/>}/>
        <Route path="social" element={<AdminSocial/>}/>
        <Route path="faq" element={<AdminFaq/>}/>
      </Route>
      <Route path="add">
        <Route path="directive" element={<AddDirective/>}/>
        <Route path="event" element={<AddEvent/>}/>
        <Route path="search" element={<AddSearch/>}/>
        <Route path="faq" element={<AddFaq/>}/>
      </Route>
      <Route path="contact" element={<AdminContact/>}/>
      <Route path="inscriptions" element={<AdminInscriptions/>}/>

      <Route path="inscription" element={<InscriptionID/>}/>
    </Route>
  </Route>
)


const pageRoutes = createBrowserRouter(
[
  ...pageUserRoutes,
  {
    path: "*",
    element: <Err404/>
  },
  {
    path: "/error",
    element: <Error/>
  },
], {
  basename: "/deportes"
})

export default pageRoutes