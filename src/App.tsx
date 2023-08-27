import { createBrowserRouter, createHashRouter, RouteObject, RouterProvider } from "react-router-dom";
import PageIndex from "./pages/user/PageIndex";
import "./css/global.css"
import "./css/colors.css"
import PageEvents from "./pages/user/PageEvents";
import PageIndexAdmin from "./pages/admin/PageIndexAdmin";
import PageDepartments from "./pages/user/activities/PageDepartments";
import PageSports from "./pages/user/activities/PageSports";
import PageLoading from "./pages/PageLoading";

const testRoute = new Promise((resolve) => {
  setTimeout(() => {
    resolve(true)
  }, 5000);
})

const pageUserRoutes: RouteObject[] = [
  {
    path: "/", element: <PageIndex/>, 
    loader: async () => {
      return await testRoute
    }
  },
  {
    path: "/events", element: <PageEvents/>, 
      loader: async () => {
        return await testRoute
      }
  },
  {
    path: "/activities/departments", element: <PageDepartments/>, 
    loader: async () => {
      return await testRoute
    }
  },
  {
    path: "/activities/sports", element: <PageSports/>, 
    loader: async () => {
      return await testRoute
    }
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

const pageRoutes = createBrowserRouter([...pageUserRoutes, ...pageAdminRoutes], {
  basename: "/deportes"
})

const App = () => <RouterProvider router={pageRoutes} fallbackElement={<PageLoading/>}/>


export default App;
