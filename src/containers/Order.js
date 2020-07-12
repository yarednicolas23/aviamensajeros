import React from 'react'

const TYPE =[{name:"Liviano"}]
const PACKAGE =[{name:"Documentos"},{name:"Caja"}]
const CITIES =[{name:"Bogotá"},{name:"Medellín"}]
const HOW =[{name:"Ahora"},{name:"Agendar"}]
const PAYMENTMETOD =[{name:"Efectivo"}]
class Order extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      type:TYPE[0].name,
      package:PACKAGE[0].name,
      city:CITIES[0].name,
      road:{
        from:{address:"",task:""},
        to:{address:"",task:""}
      },
      when:WHEN[0].name,
      payment:{type:PAYMENTMETOD[0].name,value:null}
    }
  }
}
