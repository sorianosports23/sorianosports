import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageIndex from "./pages/user/PageIndex";
import "./assets/css/global.css"

const pageRoutes = createBrowserRouter([
  {
    path: "/", element: <PageIndex/>
  }
])


const App = () => <RouterProvider router={pageRoutes}/>


export default App;
