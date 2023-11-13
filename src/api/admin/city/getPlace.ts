import api from "../../apiRoute"

const apiGetCityPlace = async (city: string): Promise<IApiGetPlace> => {
	try {
		const res = await fetch(`${api}/place/getPlace.php?city=${city}`)
		return await res.json() as IApiGetPlace
	} catch (error) {
		return {
			status: false,
			message: "Ocurrio un error inesperado",
			data: []
		}
	}
}

export default apiGetCityPlace
