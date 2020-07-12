import React from 'react'
import {
  useHistory
} from "react-router-dom"

import Button from './Button'

export default function Type(props) {
  let history = useHistory();
  const go = (data)=>{
    localStorage.setItem("type",data)
    history.push("/package")
  }
  return(
    <div className="col s12 center">
      <h3 className="title grey-text text-darken-3">¿Qué va a transportar?</h3>
      <div className="cards-container">
        <Button title="Liviano" handleClick={()=>go("Liviano")} state={props.state}/>
      </div>
    </div>
  )
}
