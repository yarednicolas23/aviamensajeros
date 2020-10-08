import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import M from 'materialize-css'

export default function Login(){
  let history = useHistory()
  const [ phone,setPhone ] = useState()
  const [ password,setPassword ] = useState()
  const submit=(event)=> {
    event.preventDefault()
    fetch('https://apimens.firebaseapp.com/user/login', {
      method: 'POST',
      headers: {'Accept': 'application/json','Content-Type': 'application/json'},
      body: JSON.stringify({phone:phone,password:password})
    })
    .then(res => {
      res.text()
      .then(response => {
        if (response!=='') {
          if (response==="password error") {
            M.toast({html:"Error de clave"})
            return
          }else {
            localStorage.setItem('user', response)
            history.push('/user/myorders')
            history.go(0)
          }
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
  return(
    <div className="container">
      <form className="row container" onSubmit={submit}>
        <h5 className="center">Iniciar Sesión</h5>
        <div className="input-field col s12">
          <i className="material-icons prefix">phone</i>
          <input id="phone" type="tel" className="validate" placeholder="Escriba su número" value={phone} onChange={e => setPhone(e.target.value)}/>
        </div>
        <div className="input-field col s12">
          <i className="material-icons prefix">lock</i>
          <input id="password" type="password" className="validate" placeholder="Escriba su clave" value={password} onChange={e => setPassword(e.target.value)}/>
        </div>
        <div className="col s12">
          <button type="submit" className="col s12 btn primary">Iniciar sesión</button>
        </div>
      </form>
    </div>
  )
}
