import { PropsWithChildren, createContext, useEffect, useState } from "react"
import apiGetSearch from "../../api/admin/search/getSearch"

const SearchContext = createContext<TSearchContext>({
  searchData: []
})

const SearchContextProvider = ({children}: PropsWithChildren) => {
  
  const [searchData, setSearchData] = useState<TSearchC[]>([])
  
  useEffect(() => {
    (async () => {
      const data = await apiGetSearch()
      if (data.status) {
        data.data.map((search) => {
          setSearchData(prev => [
            ...prev,
            {
              title: search.name,
              description: search.description,
              to: search.url,
              keywords: search.keywords
            }
          ])
          
          return null
        })
      }
    })()
  }, [])

  return (
    <SearchContext.Provider
      value={{
        searchData
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export { SearchContext, SearchContextProvider 
}