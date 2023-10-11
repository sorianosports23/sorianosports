const registerUserInfo = ({ fullname, ci, email, phone }: TApiRegisterRequest) => {
  const userInfo = {
    fullname,
    ci,
    email,
    phone
  }

  localStorage.setItem("userInfo", JSON.stringify(userInfo))
}

const getUserInfo = () => {
  return JSON.parse(localStorage.getItem("userInfo") as string)  
}

export { registerUserInfo, getUserInfo }