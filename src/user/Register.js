import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import M from 'materialize-css'

export default function Register(props){
  let history = useHistory()
  const [cookies, setCookie] = useCookies()

  const [phone,setPhone] = useState('')
  const [mail,setMail] = useState('')
  const [name,setName] = useState('')
  const [userExist,setUserExist] = useState(false)
  const go = (event) => {
    event.preventDefault()
    const data ={ mail:mail,name:name,phone:phone }
    if (!userExist) {
      fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {'Accept': 'application/json','Content-Type': 'application/json'},
        body: JSON.stringify({user:data})
      })
      .then(res => {
        res.text()
        .then(response => {
          console.log(response)
          if (response==='success') {
            setCookie('user',data)
            history.push('/user/orders')
          }else {
            M.toast({html:"Hubo un error por favor intenta nuevamente"})
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
  }
  const getUser=(phone)=>{
    setPhone(phone)
    if (phone.length>8) {
      props.database.ref('user/' + phone).on('value',(snapshot)=>{
        if(snapshot.val()!==null){
          setName(snapshot.val().name)
          setMail(snapshot.val().mail)
          setUserExist(true)
          M.toast({html:"Tu usuario existe, completamos tus datos para continuar",displayLength:4000})
        }else {
          setName("")
          setMail("")
          setUserExist(false)
        }
      })
    }
    setPhone(phone)
  }
  return(
    <div className="container">
      <div className="row">
        <h5 className="center">Registro</h5>
        <form className="col s12" onSubmit={go}>
          <div className="input-field col s12 l6">
            <i className="material-icons prefix">phone</i>
            <input value={phone} onChange={e=>getUser(e.target.value)} id="phone" placeholder="Escriba su teléfono" type="tel" className="validate" required/>
          </div>
          <div className="input-field col s12 l6">
            <i className="material-icons prefix">person</i>
            <input value={name} onChange={e=>setName(e.target.value)} id="name" placeholder="Nombre" className="validate"/>
          </div>
          <div className="input-field col s12">
            <i className="material-icons prefix">email</i>
            <input value={mail} onChange={e=>setMail(e.target.value)} id="mail" placeholder="Email" type="email" className="validate" required/>
          </div>
          {
            userExist?
            <div className="col s12">
              <p></p>
              <div className="btn primary waves-effect waves-light col s12">Enviar email de verificación de cuenta</div>
            </div>
            :
            <button className="primary btn waves-effect waves-light col s12" type="submit">Confirmar</button>
          }
        </form>
      </div>
    </div>
  )
}
