import { PropsWithChildren, useEffect } from "react"
import AdminMenu from "../../components/menu/AdminMenu"
import Container from "../../components/templates/Container"

type TAdminProps = {
  route_title: string
  children: PropsWithChildren["children"]
}

const Admin = ({ route_title, children }: TAdminProps) => {

  useEffect(() => {
    document.title = `Admin - ${route_title}`
  }, [route_title])

  return (
    <>
    <AdminMenu/>
    
    <main className="background-main">
      <Container>
        <div className="admin-title">
          <h1>{route_title}</h1>
        </div>
        {
          children
        }
      </Container>
    </main>
    </>
  )
}

export default Admin
