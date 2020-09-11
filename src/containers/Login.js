import React,{Component} from 'react'
import M from 'materialize-css'
import whats from './../assets/actions/whatsapp.svg'
import {SESSION} from '../components/Services'

import { useCookies } from 'react-cookie'
const [cookies, setCookie,removeCookie] = useCookies(['user'])

/*
  <div className="input-field col s12">
    <i className="material-icons prefix">phone</i>
    <input id="phone" type="tel" className="validate"/>
    <label for="phone">Escriba su número</label>
  </div>
  <div className="input-field col s12">
    <i className="material-icons prefix">mail</i>
    <input id="mail" type="email" className="validate"/>
    <label>Email</label>
  </div>
*/
export default class Login extends Component{
  constructor(props){
    super(props)
    this.state={phone:undefined}
    M.updateTextFields()
  }
  handleChange =(event)=> {
    console.log(event.target.value)
    this.setState({phone:event.target.value})
  }
  login=(event)=>{
    event.preventDefault();
    fetch('http://localhost:8080/create/', {
      method: 'POST',
      headers: {'Accept': 'application/json','Content-Type': 'application/json'},
      body: JSON.stringify({phone:this.state.phone})
    })
    .then(res => {
      res.text()
      .then(response => {
        if (response!='') {
          console.log(JSON.parse(response))
        }else {
          M.toast({html:"Usuario no existe"})
        }
      })
    })
    .then((result)=>{},
      // Nota: es importante manejar errores aquí y no en
      // un bloque catch() para que no interceptemos errores
      // de errores reales en los componentes.
      (error)=>{console.log(error)}
    )
  }
  render(){
    return(
      <div className="container">
        <div className="row container">
          <h5 className="center">Iniciar Sesión</h5>
          <form className="col s12" onSubmit={this.login}>
            <div className="input-field col s12">
              <i className="material-icons prefix">phone</i>
              <input id="phone" type="tel" className="validate" placeholder="Escriba su número" value={this.state.phone} onChange={this.handleChange}/>
            </div>
            <div className="col s12">
              <button type="submit" className="col s12 btn primary">Iniciar sesión</button>
            </div>
         </form>
        </div>
      </div>
    )
  }
}
