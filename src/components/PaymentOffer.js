import React, { useState } from 'react'
import {
  useHistory
} from "react-router-dom"


export default function PaymentOffer(props) {
  const [paymentOffer,setPaymentOffer]= useState(undefined)
  let history = useHistory();
  const onChange =(event)=>{
    // format number 1000000 to 1,234,567
    setPaymentOffer(event.target.value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","))
  }
  const go =()=>{
    localStorage.setItem("paymentoffer",paymentOffer)
    history.push("/resume")
  }
  return(
    <form className="row container"  onSubmit={go}>
      <h3 className="poppins grey-text text-darken-3">¿Cuanto desea pagar?</h3>
      <div className="input-field col s12">
        <input value={paymentOffer} onChange={e => onChange(e)} id="price" placeholder="15,000" type="tel" className="validate" required/>
        <span className="helper-text hide">Escriba la direccion</span>
      </div>
      <button className="primary btn waves-effect waves-light col s12" type="submit" name="action">Confirmar</button>
    </form>
  )
}
