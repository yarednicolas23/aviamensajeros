import React from 'react'
import {
  useHistory
} from "react-router-dom"

import Button from './Button'

export default function City(props) {
  let history = useHistory();
  const go =(data)=>{
    localStorage.setItem("city",data)
    history.push("/where")
  }
  return(
    <div className="col s12 center">
      <h3 className="title grey-text text-darken-3">Seleccione la cuidad</h3>
        <div className="cards-container">
        <Button title="Bogotá" handleClick={()=>go("Bogotá")} state={props.state}/>
        <Button title="Medellín" handleClick={()=>go("Medellín")} state={props.state}/>
      </div>
    </div>
  )
}
