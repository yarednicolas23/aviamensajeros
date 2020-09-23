import React, { useState } from 'react'
import { useParams } from "react-router-dom"

export default function AssignPassword(props) {
  let { phone } = useParams()
  const [ userPhone ] = useState(phone)
  
  return(
    <div className="row">
      <div className="col s12">
        <div class="input-field">
          <i class="material-icons prefix">phone</i>
          <input id="phone" type="text" class="validate" disabled value={userPhone}/>
          <label for="phone">Número de celular</label>
        </div>
      </div>
    </div>
  )
}
