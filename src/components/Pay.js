import React from 'react'
import {
  useHistory
} from "react-router-dom"
import M from 'materialize-css'
import Button from './Button'

export default function Pay(props) {
  let history = useHistory()
  const go =(data)=>{
    localStorage.setItem("pay",data)
    if (data=="Tarjeta") {
      M.toast({html:"El mensajero llevará el datafono para el pago",displayLength:4000})
    }
    history.push("/paymentoffer")
  }
  return(
    <div className="col s12 center">
      <h3 className="title grey-text text-darken-3">¿Como desea pagar?</h3>
      <div className="cards-container">
        <Button title="Efectivo" handleClick={()=>go("Efectivo")} state={props.state}/>
        <Button title="Credito/Debito" handleClick={()=>go("Tarjeta")} state={props.state}/>
      </div>
    </div>
  )
}
