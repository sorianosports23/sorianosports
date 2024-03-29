import api from "../../apiRoute"
import { TApiSendContactRequest, TApiSendContactResponse } from "./types"

const apiSendContact = async ({ username, name, email, subject, message }: TApiSendContactRequest): Promise<TApiSendContactResponse> => {
  try {
    const contactData = {
      username,
      name,
      email,
      subject,
      messageContact: message
    }

    const req = await fetch(`${api}/contact/contactForm.php`, {
      method: "POST",
      body: JSON.stringify(contactData)
    })

    return await req.json()
  } catch (error) {
    return {
      status: false,
      message: ""
    }
  }
}

export default apiSendContact
