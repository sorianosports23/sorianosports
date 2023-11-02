import { useCallback, useContext, useEffect, useState } from "react"
import Admin from "./Admin"
import Loading from "../Loading"
import { userSessionContext } from "../../context/session/UserSessionContext"
import apiAdminGetContact from "../../api/admin/contact/getContact"
import Pagination from "../../components/admin/templates/Pagination"
import tableStyles from "../../css/admin/table.module.css"

const Contact = () => {

  const { token } = useContext(userSessionContext)

  const [loading, setLoading] = useState(true)

  const [contactData, setContactData] = useState<TContact[]>([])
  const [actualPage, setActualPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const handleGetContact = useCallback(async (pag: number = 1) => {
    if (!token) return
    const data = await apiAdminGetContact({ token, pag })
    setLoading(false)
    if (data.status) {
      setContactData(data.data)
      setTotalPages(data.pagination.totalPages)
    } else {
      setContactData([])
      setActualPage(1)
      setTotalPages(1)
    }
  }, [token])

  useEffect(() => {
    handleGetContact()
  }, [handleGetContact])

  const handlePrevPage = () => {
    if (actualPage-1 === 0) return 
    handleGetContact(actualPage - 1)
    setActualPage(actualPage - 1)
  }

  const handleNextPage = () => {
    if (actualPage+1 > totalPages) return
    handleGetContact(actualPage + 1)
    setActualPage(actualPage + 1)
  }

  const handleChangePage = (page: number) => {
    if (page < 0 || page > totalPages) return
    handleGetContact(page)
  }

  if (loading) {
    return <Loading/>
  }

  return (
    <Admin route_title="Contacto">
      <div className={tableStyles.table}>
        {
          contactData.map((contact) => (
            <div className={tableStyles.entry}>
              <div className={tableStyles.id}>
                <span>{contact.id}</span>
              </div>

              <div className={tableStyles.info}>
                <p>{contact.subject}</p>
              </div>

              <div className={tableStyles.btns}>
                <button className={tableStyles.show}>Ver mas</button>
              </div>
            </div>
          ))
        }
      </div>
      <div className={tableStyles.pagination}>
        <Pagination
          actualPage={actualPage}
          totalPages={totalPages}
          prevBtn={handlePrevPage}
          nextBtn={handleNextPage}
          changePage={handleChangePage}
        />
      </div>
    </Admin>
  )
}

export default Contact
