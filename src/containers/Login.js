import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom'
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
export default function Login(){
  const [phone,setPhone] =useState(undefined)
  //const [ setCookie ] = useCookies()
  let history = useHistory()
  //removeCookie('courier')
  //setCookie('couier',{name:"John Doe",mail:"johndoe@hotmail.com",phone:3212833647})
  useEffect(() => {
    M.updateTextFields()
  },[])
  const submit=(event)=> {
    event.preventDefault()
    fetch('http://localhost:8080/courier/login', {
      method: 'POST',
      headers: {'Accept': 'application/json','Content-Type': 'application/json'},
      body: JSON.stringify({phone:phone})
    })
    .then(res => {
      res.text()
      .then(response => {
        console.log(response)
        if (response!=='') {
          localStorage.setItem('courier', response)
          //setCookie('courier',JSON.parse(response))
          history.push('/courier/orders')
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
      <div className="row container">
        <h5 className="center">Iniciar Sesión</h5>
        <form className="col s12" onSubmit={submit}>
          <div className="input-field col s12">
            <i className="material-icons prefix">phone</i>
            <input id="phone" type="tel" className="validate" placeholder="Escriba su número" value={phone} onChange={e => setPhone(e.target.value)}/>
          </div>
          <div className="col s12">
            <button type="submit" className="col s12 btn primary">Iniciar sesión</button>
          </div>
       </form>
      </div>
    </div>
  )
}
