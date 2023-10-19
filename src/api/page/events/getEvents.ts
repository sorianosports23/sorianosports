import api from "../../apiRoute"

const apiGetEvents = async (pos: number = 1): Promise<IApiGetEventsResponse> => {
  try {
    const res = await fetch(`${api}/events/getEvents.php?pag=${pos}`)
    return await res.json() as IApiGetEventsResponse
  } catch (error) {
    return {
      status: false,
      data: [],
      pagination: {
        totalPages: 0,
        currentPage: 0
      }
    }
  }
}

export default apiGetEvents