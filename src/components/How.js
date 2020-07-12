import React from 'react'
import {
  useHistory
} from "react-router-dom"

import Button from './Button'

export default function How(props) {
  let history = useHistory();
  const go =(data)=>{
    localStorage.setItem("how",data)
     history.push("/pay")
  }
  return(
    <div className="col s12 center">
      <h3 className="title grey-text text-darken-3">¿Cuando lo llevamos?</h3>
      <div className="cards-container">
        <Button title="Ahora" handleClick={()=>go("Ahora")} state={props.state}/>
        <Button title="Agendar" handleClick={()=>go("Agendar")} state={props.state}/>
      </div>
    </div>
  )
}
