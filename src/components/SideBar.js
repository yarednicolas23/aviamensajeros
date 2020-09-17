import React from 'react'
import {Link/*,useHistory*/} from "react-router-dom"
import { useCookies } from 'react-cookie'


export default function SideBar(props) {

  const [cookies/*, setCookie,removeCookie*/] = useCookies(['user'])
  //let history = useHistory()
  //console.log(cookies.user)
  if (cookies.user==null) {
    //history.push('/')
  }

  const active = props.active
  return (
    <table className="highlight">
      <tbody>
        <tr className={active==='home'?"grey lighten-4":null} style={{border:'none'}}>
          <td><i className={active==='home'?"material-icons-outlined indigo-text":"material-icons-outlined grey-text"}>home</i></td>
          <td><Link to="/courier/home" className={active==='home'?"indigo-text":"grey-text"}>Home</Link></td>
        </tr>
        <tr className={active==='orders'?"grey lighten-4":null} style={{border:'none'}}>
          <td><i className={active==='orders'?"material-icons-outlined indigo-text":"material-icons-outlined grey-text"}>moped</i></td>
          <td><Link to="/courier/orders" className={active==='orders'?"indigo-text":"grey-text"}>Orders</Link></td>
        </tr>
        <tr className={active==='orderhistory'?"grey lighten-4":null} style={{border:'none'}}>
          <td><i className={active==='orderhistory'?"material-icons-outlined indigo-text":"material-icons-outlined grey-text"}>history</i></td>
          <td><Link to="/courier/orderhistory" className={active==='orderhistory'?"indigo-text":"grey-text"}>Order history</Link></td>
        </tr>
        <tr style={{border:'none'}}>
          <td><i className="material-icons grey-text">close</i></td>
          <td className="grey-text">Close session</td>
        </tr>
      </tbody>
    </table>
  )
}
