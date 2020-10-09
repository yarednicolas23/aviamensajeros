import React, { useState } from 'react'
import { Link,useHistory } from 'react-router-dom'
import M from 'materialize-css'
//import { useCookies } from 'react-cookie'

import courierimg from '../assets/charters/ToyFaces_Colored_BG_29.jpg'
import userimg from '../assets/charters/ToyFaces_Colored_BG_56.jpg'

export default function NavBar() {
  //const [cookies/*, setCookie,removeCookie*/] = useCookies()
  //console.log(cookies.user)
  let history = useHistory()
  const [courier] = useState(JSON.parse(localStorage.getItem('courier')))
  const [user] = useState(JSON.parse(localStorage.getItem('user')))
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav')
    M.Sidenav.init(elems,{edge:"right"})
  })

  const closeSession =()=>{
    localStorage.removeItem('courier')
    localStorage.removeItem('user')
    //removeCookie('courier')
    history.push('/')
    history.go(0)
  }
  return (
    <nav className="row white no-margin">
      <div className="nav-wrapper col s12">
        <Link to="/" className="brand-logo title black-text">aviamensajeros<span className="primary-text">.</span></Link>
        <a data-target="slide-out" className="sidenav-trigger black-text"><i className="material-icons">menu</i></a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {
            courier!=null?
            <>
              <li>
                <Link to="/courier/home" className="black-text">
                  <img className="responsive-img img-profile" src={courierimg} alt={"foto del mensajero"}/>
                  <span> {courier.name} </span>
                </Link>
              </li>
              <li>
                <a data-target="slide-out" className="sidenav-trigger black-text" style={{display:'block'}}><i className="material-icons">menu</i></a>
              </li>
            </>
            :
            user!=null?
            <>
              <li>
                <Link to="/user/myorders" className="black-text">
                  <img className="responsive-img img-profile" src={userimg} alt={"foto del usuario"}/>
                  <span> {user.name} </span>
                </Link>
              </li>
              <li>
                <a data-target="slide-out" className="sidenav-trigger black-text" style={{display:'block'}}><i className="material-icons">menu</i></a>
              </li>
            </>
            :
            <>
            <li>
              <Link to="/register" className="grey-text">Registro</Link>
            </li>
            <li>
              <Link to="/login" className="btn primary">Iniciar sesión</Link>
            </li>
            </>
          }
        </ul>
      </div>
      {
        courier!=null?
        <ul id="slide-out" className="sidenav">
          <li>
            <div className="user-view">
              <div className="background">
                <img src={courierimg}/>
              </div>
              <a href="#user"><img className="circle" src={courierimg}/></a>
              <a href="#name"><span className="white-text name">{courier.name}</span></a>
              <a href="#email"><span className="white-text email">{courier.mail}</span></a>
            </div>
          </li>
          <li><Link to="/courier/home"><i className="material-icons-outlined">timer</i>Pedidos en curso</Link></li>
          <li><Link to="/courier/orders"><i className="material-icons-outlined">moped</i>Pedidos</Link></li>
          <li><Link to="/courier/orderhistory"><i className="material-icons-outlined">history</i>Historial de pedidos</Link></li>
          <li><div className="divider"></div></li>
          <li><a onClick={()=>closeSession()}><i className="material-icons-outlined">close</i>Cerrar sesión</a></li>
        </ul>
        :null
      }
      {
        user!=null?
        <ul id="slide-out" className="sidenav">
          <li>
            <div className="user-view">
              <div className="background">
                <img src={userimg}/>
              </div>
              <a href="#user"><img className="circle" src={userimg}/></a>
              <a href="#name"><span className="white-text name">{user.name}</span></a>
              <a href="#email"><span className="white-text email">{user.mail}</span></a>
            </div>
          </li>
          <li><Link to="/user/myorders"><i className="material-icons-outlined">home</i>Mis pedidos</Link></li>
          <li><Link to="/user/orderhistory"><i className="material-icons-outlined">history</i>Historial de pedidos</Link></li>
          <li><div className="divider"></div></li>
          <li><a onClick={()=>closeSession()}><i className="material-icons-outlined">close</i>Close session</a></li>
        </ul>
        :null
      }

    </nav>
  )
}
