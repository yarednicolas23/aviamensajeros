import React, { useState } from 'react'
import {
  useHistory
} from "react-router-dom"

export default function Where(props) {
  const [fromAddress,setFromAddress] = useState('')
  const [fromTask,setFromTask] = useState('')
  const [toAddress,setToAddress] = useState('')
  const [toTask,setToTask] = useState('')
  const [paymentInOrigin,setPaymentInOrigin] = useState(false)
  let history = useHistory();
  const go = (event)=>{
    event.preventDefault()
    const data ={
      from:{
        address:fromAddress,
        task:fromTask
      },
      to:{
        address:toAddress,
        task:toTask
      },
      paymentInOrigin:paymentInOrigin
    }
    localStorage.setItem("road",JSON.stringify(data))
    history.push("/how")
  }
  return(
    <div className="row">
      <form onSubmit={go}>
        <div className="col s12 m6 l6">
          <h4 className="title grey-text text-darken-3">¿Donde recogemos?</h4>
          <div className="input-field col s12">
            <i className="material-icons-outlined prefix">my_location</i>
            <input value={fromAddress} onChange={e => setFromAddress(e.target.value)} id="where" placeholder="Escriba la dirección de recogida" type="text" className="validate" required/>
            <span className="helper-text hide">Escriba la direccion</span>
          </div>
          <div className="input-field col s12">
            <i className="material-icons-outlined prefix">connect_without_contact</i>
            <textarea value={fromTask} onChange={e => setFromTask(e.target.value)} id="how" placeholder="¿Que debe hacer el mensajero al llegar?" className="materialize-textarea" required></textarea>
            <span className="helper-text hide">¿Que debe hacer el mensajero en la dirección incial?</span>

            <p>
              <label>
                <input type="checkbox" value={paymentInOrigin} onChange={e => setPaymentInOrigin(!paymentInOrigin)}/>
                <span>Pago en dirección de recogida</span>
              </label>
            </p>
          </div>
        </div>
        <div className="col s12 m6 l6">

          <h4 className="title grey-text text-darken-3">¿A donde lo llevamos?</h4>
          <div className="input-field col s12">
            <i className="material-icons-outlined prefix">location_on</i>
            <input value={toAddress} onChange={e => setToAddress(e.target.value)} id="where" placeholder="Escriba la dirección de entrega" type="text" className="validate" required/>
          </div>
          <div className="input-field col s12">
            <i className="material-icons-outlined prefix">receipt_long</i>
            <textarea value={toTask} onChange={e => setToTask(e.target.value)} id="how" placeholder="¿Que debe hacer el mensajero al finalizar?" className="materialize-textarea" required></textarea>
          </div>
          <p className="hide">
            <label>
              <input type="checkbox" />
              <span>¿El mensajero debe regresar?</span>
            </label>
          </p>
        </div>
        <button className="primary btn waves-effect waves-light col s12" type="submit" name="action">Confirmar</button>
      </form>
    </div>
  )
}
