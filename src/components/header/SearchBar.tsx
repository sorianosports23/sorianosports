import { useContext, useEffect, useState } from "react"
import { FaRegFaceFrown } from "react-icons/fa6"
import styleBar from "../../css/header/SearchBar.module.css"
import { Link } from "react-router-dom"
import { SearchContext } from "../../context/search/SearchContext"

type TSearchBarProps = {
  search: string
  searchHover: boolean
}

const SearchBar = ({ search, searchHover }: TSearchBarProps) => {

  const { searchData } = useContext(SearchContext)

  const [showResults, setShowResults] = useState(false)
  const [searchResults, setSearchResults] = useState<typeof searchData>([])

  useEffect(() => {

    if (!search) {
      setShowResults(false)
      return
    }

    setShowResults(true)

    const results = [] as typeof searchData
    searchData.map(value => {
      const keys = value.keywords.filter(key => key.toLowerCase().includes(search.toLowerCase()))
      if (keys.length > 0) results.push(value)

      return null
    })
    setSearchResults(results)
  }, [searchData, search])
  
  useEffect(() => {
    if (search) {
      setShowResults(searchHover)
    }
  }, [search, searchHover])

  return (
    <div className={styleBar.results}
    style={{
      display: showResults ? "initial" : "none"
    }}
    >
      {
        searchResults.length > 0 
          ?                
            searchResults.map((result, i) => (
              <Link key={i} to={result.to} className={styleBar.result}>
                <h3>{result.title}</h3>
                <p>{result.description}</p>
              </Link>
            ))
          : 
            <div className={styleBar.noresult}>
              <div>
                <FaRegFaceFrown/>
              </div>
              No se encontraron resultados
            </div>
      }
    </div>
  )
}

export default SearchBar