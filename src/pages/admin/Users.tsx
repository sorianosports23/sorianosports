import { useEffect, useState, useContext, useCallback } from "react"
import UsersSearch from "../../components/admin/users/UsersSearch"
import Admin from "./Admin"
import UserCard from "../../components/admin/users/UserCard"
import styles from "../../css/admin/users/Users.module.css"
import { userSessionContext } from "../../context/session/UserSessionContext"
import apiAdminGetUsers from "../../api/admin/getUsers"
import TableStyles from "../../css/admin/table.module.css"
import Pagination from "../../components/admin/templates/Pagination"
import EditUser from "../../components/admin/modal/EditUser"
import apiAdminDeleteUser from "../../api/admin/users/deleteUser"
import OptionModal from "../../components/modal/OptionModal"
import SendModal from "../../components/modal/SendModal"

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

  //!MODAL
  const [editOpen, setEditOpen] = useState(false)
  const [userEdit, setUserEdit] = useState<TUser>({username: "", email: "", fullname: "", permissions: [], phone: 0, age: 0, ci: 0})
  //!

  //!Opt Modal
  const [optModal, setOptModal] = useState(false)
  const [userToDelete, setUserToDelete] = useState("")
  //!

  //! SEND MODAL
  const [sendModal, setSendModal] = useState(false)
  const [sendModalMsg, setSendModalMsg] = useState("")
  const [sendModalOtherMsg, setSendModalOtherMsg] = useState("")
  //!

  const handleEditUser = (user: TUser) => {
    setUserEdit(user)
    setEditOpen(true)
  }

  const handleAskDeleteUser = (username: string) => {
    setUserToDelete(username)
    setOptModal(true)
  }

  const handleDeleteUser = async () => {
    const data = {
      token,
      username: userToDelete
    }

    const res = await apiAdminDeleteUser(data)

    if (res.status) {
      setSendModalMsg("Se elimino el usuario")
      setSendModalOtherMsg("")
      handleGetUsers(actualPage)
    } else {
      setSendModalMsg("No se pudo eliminar el usuario")
      setSendModalOtherMsg(res.message)
    }

    setOptModal(false)
    setSendModal(true)
  }

  const handleShowModalSend = (msg: string, otMsg: string, loadUsers: boolean) => {
    setSendModalMsg(msg)
    setSendModalOtherMsg(otMsg)
    setSendModal(true)
    if (loadUsers) handleGetUsers(actualPage)
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
                handleDeleteUser={() => handleAskDeleteUser(user.username)}
                handleEditUser={() => handleEditUser(user)}
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

      <EditUser
        open={editOpen}
        close={() => setEditOpen(false)}
        info={userEdit}
        openSend={handleShowModalSend}
      />

      <OptionModal
        open={optModal}
        close={() => setOptModal(false)}
        option="Eliminar"
        optionName={userToDelete}
        acceptFunction={handleDeleteUser}
      />

      <SendModal
        open={sendModal}
        close={() => setSendModal(false)}
        message={sendModalMsg}
        otherMessage={sendModalOtherMsg}
      />
    </Admin>
  )
}

export default Users
