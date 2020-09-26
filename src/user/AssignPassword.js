import React, { useState,useEffect } from 'react'
import { useParams,useHistory } from 'react-router-dom'
import M from 'materialize-css'

export default function AssignPassword(props) {
  let history = useHistory()
  let { phone } = useParams()
  const [ userPhone ] = useState(phone)
  const [ mail,setMail ] = useState()
  const [ password,setPassword ] = useState()
  const getUser =async () =>{
    fetch('http://localhost:8080/user/get/secret', {
      method: 'POST',
      headers: {'Accept': 'application/json','Content-Type': 'application/json'},
      body: JSON.stringify({phone:phone})
    })
    .then(res => {
      res.text()
      .then(response => {
        console.log(JSON.parse(response))
        if (response!=='') {
          if (JSON.parse(response).account.verified) {
            M.toast({html:"Tu cuenta ya fue verificada"})
            history.push('/')
          }
          setMail(JSON.parse(response).email)
          M.updateTextFields()
          //localStorage.setItem('courier', response)
          //setCookie('courier',JSON.parse(response))

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
  const submit=(event)=> {
    event.preventDefault()
    fetch('http://localhost:8080/user/assignpassword', {
      method: 'POST',
      headers: {'Accept': 'application/json','Content-Type': 'application/json'},
      body: JSON.stringify({phone:phone,password:password})
    })
    .then(res => {
      res.text()
      .then(response => {
        console.log(response)
        if (response!=='') {
          //setCookie('courier',JSON.parse(response))
          M.toast({html:"Tu clave fue asignada, ahora puedes iniciar sesión"})
          setTimeout(function () {
            history.push('/')
          }, 1000)
        }else {
          M.toast({html:"algo salio mal, por favor recarga la pagina"})
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
  useEffect(() => {
    getUser()
  },[])
  return(
    <div className="container">
      <div className="row">
        <form className="col s12" onSubmit={submit}>
          <div className="input-field">
            <i className="material-icons prefix">phone</i>
            <input id="phone" type="text" className="validate" disabled value={userPhone}/>
            <label>Número de celular</label>
          </div>
          <div className="input-field">
            <i className="material-icons prefix">mail</i>
            <input id="mail" type="text" className="validate" disabled value={mail}/>
            <label>Email</label>
          </div>
          <div className="input-field">
            <i className="material-icons prefix">lock</i>
            <input id="password" type="password" placeholder="Clave nueva" className="validate" value={password} onChange={e => setPassword(e.target.value)}/>
          </div>

          <div className="col s12">
            <button type="submit" className="col s12 btn primary">Confirmar cuenta</button>
          </div>
        </form>
      </div>
    </div>
  )
}
