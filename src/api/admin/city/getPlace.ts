import api from "../../apiRoute"

const getPlace = async (city: string): Promise<IApiGetPlace> => {
	try {
		const res = await fetch(`${api}/place/getPlace.ts?city=${city}`)
		return await res.json() as IApiGetPlace
	} catch (error) {
		return {
			status: false,
			message: "Ocurrio un error inesperado",
			data: []
		}
	}
}

export default getPlace
