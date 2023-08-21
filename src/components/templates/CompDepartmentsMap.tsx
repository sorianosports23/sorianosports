const CompDepartmentsMap = () => {
  return (
  <div id="departments_map" style={{width: 645, height: 451, position: 'relative'}}>
    <div id="department_background" style={{width: 645, height: 451, left: 0, top: 0, position: 'absolute', background: `url(${process.env.PUBLIC_URL + "/assets/map/background.svg"})`, border: '0.94px #373435 solid'}}></div>
    <button onClick={() => console.log("Dolores")} id="department_dolores" style={{width: 32, height: 47, left: 111, top: 178, position: 'absolute', background: `url(${process.env.PUBLIC_URL + "/assets/map/department_icon.svg"})`}}></button>
    <button onClick={() => console.log("nose")} id="department_unknown" style={{width: 31, height: 47, left: 385, top: 105, position: 'absolute', background: `url(${process.env.PUBLIC_URL + "/assets/map/department_icon.svg"})`}}></button>
  </div>
  )
}

export default CompDepartmentsMap