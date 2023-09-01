type TUseSearchParamsResponse = {
  searchParams: boolean,
  params?: { [paramName: string]: any }
}

const useSearchParams = (): TUseSearchParamsResponse => {
  const urlSearch = window.location.search

  if (!urlSearch) {
    return {
      searchParams: false
    }
  }

  const searchParams = new URLSearchParams(urlSearch)

  if (searchParams.size === 0) {
    return {
      searchParams: false
    }
  }

  const params: TUseSearchParamsResponse["params"] = {}

  searchParams.forEach((paramValue, param) => {
    params[param] = paramValue
  })

  return {
    searchParams: true,
    params
  }
}

export default useSearchParams
