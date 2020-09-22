import React, { useState } from 'react'
import {
  useHistory
} from "react-router-dom"

export default function Where(props) {
  const [fromAddress,setFromAddress] = useState('')
  const [fromTask,setFromTask] = useState('')
  const [toAddress,setToAddress] = useState('')
  const [toTask,setToTask] = useState('')
  let history = useHistory();
  const go = ()=>{
    const data ={
      from:{
        address:fromAddress,
        task:fromTask
      },
      to:{
        address:toAddress,
        task:toTask
      }
    }
    localStorage.setItem("road",JSON.stringify(data))
    history.push("/how")
  }
  return(
    <div className="row">
      <form className="container" onSubmit={go}>
        <h3 className="title grey-text text-darken-3">¿Donde recogemos?</h3>
        <div className="input-field col s12">
          <input value={fromAddress} onChange={e => setFromAddress(e.target.value)} id="where" placeholder="Escriba la dirección de recogida" type="text" className="validate" required/>
          <span className="helper-text hide">Escriba la direccion</span>
        </div>
        <div className="input-field col s12">
          <textarea value={fromTask} onChange={e => setFromTask(e.target.value)} id="how" placeholder="¿Que debe hacer el mensajero?" className="materialize-textarea"></textarea>
          <span className="helper-text hide">¿Que debe hacer el mensajero?</span>
        </div>
        <h3 className="title grey-text text-darken-3">¿A donde lo llevamos?</h3>
        <div className="input-field col s12">
          <input value={toAddress} onChange={e => setToAddress(e.target.value)} id="where" placeholder="Escriba la dirección de entrega" type="text" className="validate"/>
        </div>
        <div className="input-field col s12">
          <textarea value={toTask} onChange={e => setToTask(e.target.value)} id="how" placeholder="¿Que debe hacer el mensajero?" className="materialize-textarea"></textarea>
        </div>
        <button className="primary btn waves-effect waves-light col s12" type="submit" name="action">Confirmar</button>
      </form>
    </div>
  )
}
