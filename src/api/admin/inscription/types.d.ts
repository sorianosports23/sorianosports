type TApiSendInscriptionRequest = {
  token: string
  data: Omit<TInscription, "state">  
}