import React from 'react'
export default function Login(){
  return(
    <div className="container">
      <div className="row container">
        <h5 className="center">Iniciar Sesión</h5>
        <div className="input-field col s12">
          <i className="material-icons prefix">phone</i>
          <input id="phone" type="tel" className="validate" placeholder="Escriba su número"/>
        </div>
        <div className="input-field col s12">
          <i className="material-icons prefix">lock</i>
          <input id="password" type="password" className="validate" placeholder="Escriba su clave"/>
        </div>
        <div className="col s12">
          <button type="submit" className="col s12 btn primary">Iniciar sesión</button>
        </div>
      </div>
    </div>
  )
}
