import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageIndex from "./pages/user/PageIndex";
import "./css/global.css"
import PageEvents from "./pages/user/PageEvents";

const pageRoutes = createBrowserRouter([
  {
    path: "/", element: <PageIndex/>
  },
  {
    path: "/events", element: <PageEvents/>
  }
])


const App = () => <RouterProvider router={pageRoutes}/>


export default App;
