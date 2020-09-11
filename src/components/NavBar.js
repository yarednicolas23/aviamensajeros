import React from 'react'
import {
  Link
} from "react-router-dom"

import courier from '../assets/charters/ToyFaces_Colored_BG_29.jpg'

import { useCookies } from 'react-cookie'

export default function NavBar() {
  const [cookies, setCookie,removeCookie] = useCookies(['name'])
  console.log(cookies.name)
  return (
    <nav className="white col s12">
      <div className="nav-wrapper container">
        <Link to="/" className="brand-logo title black-text center">aviamensajeros</Link>
        {
          cookies.name!=null?
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <Link to="/" className="black-text">
                  <img className="responsive-img img-profile" src={courier} alt={"foto del mensajero"}/>
                  <span> Yared T. </span>
                  <div className="btn-floating btn-flat grey lighten-4"><i className="material-icons grey-text" style={{lineHeight:'inherit'}}>keyboard_arrow_down</i></div>
                </Link>
              </li>
            </ul>
          :
          null
        }
      </div>
    </nav>
  )
}
