import React from 'react'

import whats from './../assets/actions/whatsapp.svg'

/*
  <div className="input-field col s12">
    <i className="material-icons prefix">phone</i>
    <input id="phone" type="tel" className="validate"/>
    <label for="phone">Escriba su número</label>
  </div>
*/
export default class Login extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className="container">
        <div className="row">
          <h5 className="center">Iniciar Sesión</h5>
          <form className="col s12">
            <div className="input-field col s12">
              <i className="material-icons prefix">mail</i>
              <input id="mail" type="email" className="validate"/>
              <label for="mail">Escriba su email</label>
            </div>
            <div className="container">
              <div className="col s12 no-padding">
                <button className="col s12 btn primary">Recibir codigo por email</button>
              </div>
            </div>
         </form>
        </div>
      </div>
    )
  }
}
