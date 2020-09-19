import React,{useState} from 'react'
import M from 'materialize-css'

export default function Register(props){
  const [mail,setMail] = useState('')
  const [name,setName] = useState('')
  const [phone,setPhone] = useState('')
  const [userExist,setUserExist] = useState(false)
  const go =(event)=>{
    event.preventDefault()
    const data ={ mail:mail, name:name, phone:phone }
    if (userExist) {

    }
    props.setUser(data)
  }
  const getUser=(phone)=>{
    if (phone.length>8) {
      props.database.ref('user/' + phone).on('value',(snapshot)=>{
        if(snapshot.val()!==null) {
          setName(snapshot.val().name)
          setMail(snapshot.val().mail)
          setUserExist(true)
          M.toast({html:"Tu usuario existe, completamos tus datos para continuar"})
        }else {
          setName("")
          setMail("")
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
            <input value={phone} onChange={e=>getUser(e.target.value)} id="phone" placeholder="Escriba su teléfono" type="tel" className="validate" required/>
          </div>
          <div className="input-field col s12 l6">
            <input value={name} onChange={e=>setName(e.target.value)} id="name" placeholder="Nombre" className="validate"/>
          </div>
          <div className="input-field col s12">
            <input value={mail} onChange={e=>setMail(e.target.value)} id="mail" placeholder="Email" type="email" className="validate" required/>
          </div>
          <button className="primary btn waves-effect waves-light col s12" type="submit">Confirmar</button>
        </form>
      </div>
    </div>
  )
}
