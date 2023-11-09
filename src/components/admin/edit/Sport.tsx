type TCity = {
  sport: string
}

const Sport = ({ sport }: TCity) => {
  return (
    <div>
      <h2>{sport}</h2>
    </div>
  )
}

export default Sport
