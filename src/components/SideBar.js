import React from 'react'
import {
  Link
} from "react-router-dom"
export default function SideBar() {
  return (
    <table className="highlight">
      <tbody>
        <tr style={{border:'none'}}>
          <td><i className="material-icons-outlined">home</i></td>
          <td><Link>Home</Link></td>
        </tr>
        <tr style={{border:'none'}}>
          <td><i className="material-icons-outlined">moped</i></td>
          <td>Orders</td>
        </tr>
        <tr style={{border:'none'}}>
          <td><i className="material-icons">close</i></td>
          <td>Close session</td>
        </tr>
      </tbody>
    </table>
  )
}
