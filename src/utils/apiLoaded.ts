let apiLoaded: boolean

const apiWorking = process.env.REACT_APP_API_WORKING

if (apiWorking) {
  if (apiWorking === "false") apiLoaded = false
  else apiLoaded = true
} 
else {
  apiLoaded = false
}

export default apiLoaded