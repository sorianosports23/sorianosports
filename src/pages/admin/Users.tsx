import { useEffect, useState, useContext, useCallback } from "react"
import UsersSearch from "../../components/admin/users/UsersSearch"
import Admin from "./Admin"
import UserCard from "../../components/admin/users/UserCard"
import styles from "../../css/admin/users/Users.module.css"
import { userSessionContext } from "../../context/session/UserSessionContext"
import apiAdminGetUsers from "../../api/admin/getUsers"
import TableStyles from "../../css/admin/table.module.css"
import Pagination from "../../components/admin/templates/Pagination"

const Users = () => {

  const { token } = useContext(userSessionContext)

  const [users, setUsers] = useState<Array<TUser>>([])
  const [actualPage, setActualPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const handleGetUsers = useCallback(async (page: number = 1) => {
    if (!token) return
    const data = await apiAdminGetUsers({token, pag: page})
    setUsers(data.data)
    setTotalPages(data.pagination.totalPages)
  }, [token])

  useEffect(() => {
    handleGetUsers()
  }, [handleGetUsers])

  const handlePrevPage = () => {
    if (actualPage - 1 === 0) return
    handleGetUsers(actualPage - 1)
    setActualPage(prev => prev-1)
  }
  
  const handleNextPage = () => {
    if (actualPage + 1 > totalPages) return
    handleGetUsers(actualPage + 1)
    setActualPage(prev => prev+1)
  }

  const handleChangePage = (page: number) => {
    if (page <= 0 || page > totalPages) return
    handleGetUsers(page)
    setActualPage(page)
  }

  return (
    <Admin route_title="Usuarios">
      <UsersSearch setUsers={setUsers} type="users"/>
      <UsersSearch setUsers={setUsers} type="ci"/>

      <div className={styles.res}>
        <div className={styles.resList}>
          {
            users.map((user, i) => (
              <UserCard
                key={i}
                {...user}
              />
            ))
          }
        </div>
        <div className={TableStyles.pagination}>
          <Pagination
            actualPage={actualPage}
            totalPages={totalPages}
            prevBtn={handlePrevPage}
            nextBtn={handleNextPage}
            changePage={handleChangePage}
          />
        </div>
      </div>
    </Admin>
  )
}

export default Users
