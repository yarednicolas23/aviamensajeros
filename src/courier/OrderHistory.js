import React, { useState,useEffect } from 'react'
import * as firebase from "firebase/app"
import moment from 'moment'


function currencyFormat(price){
  return price.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

export default function OrderHistory() {
  const [list,setList]=useState([])
  const [courier] = useState(JSON.parse(localStorage.getItem('courier')))
  useEffect(() => {
    const getList = async()=>{
      firebase.database().ref('orderhistory').orderByChild('courier').equalTo(courier.phone).on("value", function(snapshot) {
        var flist=[]
        setList([])
        snapshot.forEach(function(data) {
          var childData = data.val()
          childData.id= data.key
          flist.push(childData)
        })
        setList(flist)
      })
    }
    getList()
  }, [])
  return(
    <div className="row">
      <div className="col s12">
        <h5><b>Historial de pedidos</b></h5>
          <table>
          <thead>
            <tr>
                <th>Tipo de paquete</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Tipo de pago</th>
                <th>Valor del pago</th>
                <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {
              list.map((order,i)=>

                <tr>
                  <td>{order.package}</td>
                  <td>{moment(order.creation).format('DD MMM YYYY')}</td>
                  <td>{moment(order.creation).format('hh:mm A')}</td>
                  <td>{order.pay}</td>
                  <td>{'$ '+currencyFormat(order.paymentoffer)}</td>
                  {order.step===4?<td className="green-text">Finalizado</td>:null}
                </tr>
              )
            }
          </tbody>
        </table>

      </div>
    </div>
  )
}