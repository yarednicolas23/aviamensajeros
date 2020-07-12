import React from 'react'
import {
  useHistory
} from "react-router-dom"

import Button from './Button'

export default function Pay(props) {
  let history = useHistory()
  const go =(data)=>{
    localStorage.setItem("pay",data)
    history.push("/paymentoffer")
  }
  return(
    <div className="col s12 center">
      <h3 className="title grey-text text-darken-3">¿Como desea pagar?</h3>
      <div className="cards-container">
        <Button title="Efectivo" handleClick={()=>go("Efectivo")} state={props.state}/>
      </div>
    </div>
  )
}
