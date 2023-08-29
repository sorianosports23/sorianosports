const assetsFolder = 
  process.env.NODE_ENV === "development" 
    ? `${process.env.PUBLIC_URL}/assets`
    : `${process.env.PUBLIC_URL}/deportes/assets`

export default assetsFolder