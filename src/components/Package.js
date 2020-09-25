import React from 'react'
import {
  useHistory
} from "react-router-dom"

import Button from './Button'

export default function Package(props) {
  let history = useHistory();
  const go =(data)=>{
    localStorage.setItem("package",data)
    history.push("/city")
  }
  return(
    <div className="col s12 center">
      <h5 className="title grey-text text-darken-3">¿Qué paquete desea enviar?</h5>
      <br/>
      <div className="cards-container">
        <Button title="Documentos" handleClick={()=>go("Documentos")} state={props.state}/>
        <Button title="Caja" handleClick={()=>go("Caja")} state={props.state}/>
        <Button title="Encargo" handleClick={()=>go("Encargo")} state={props.state}/>
      </div>
    </div>
  )
}
