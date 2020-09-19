import React,{useState,useEffect} from 'react'
//import { useCookies } from 'react-cookie'
import M from 'materialize-css'

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
function submit(event) {
  event.preventDefault();
  fetch('http://localhost:8080/create/', {
    method: 'POST',
    headers: {'Accept': 'application/json','Content-Type': 'application/json'},
    body: JSON.stringify({phone:'phone'})
  })
  .then(res => {
    res.text()
    .then(response => {
      if (response!=='') {
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
export default function Login(){
  const [phone] =useState(undefined)
  //const [cookies, setCookie,removeCookie] = useCookies()
  //removeCookie('user')
  //setCookie('couier',{name:"John Doe",mail:"johndoe@hotmail.com",phone:3212833647})
  useEffect(() => {
    M.updateTextFields()
  })

  return(
    <div className="container">
      <div className="row container">
        <h5 className="center">Iniciar Sesión</h5>
        <form className="col s12" onSubmit={submit}>
          <div className="input-field col s12">
            <i className="material-icons prefix">phone</i>
            <input id="phone" type="tel" className="validate" placeholder="Escriba su número" value={phone}/>
          </div>
          <div className="col s12">
            <button type="submit" className="col s12 btn primary">Iniciar sesión</button>
          </div>
       </form>
      </div>
    </div>
  )
}
