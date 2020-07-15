import React from 'react'
import { Link } from "react-router-dom"
//import motorcycle from './../assets/motor.svg'
import money from './../assets/money.svg'
import distance from './../assets/distance.svg'
import shield from './../assets/shield.svg'
import smartphone from './../assets/smartphone.svg'
//import courier from './../assets/charters/ToyFaces_Tansparent_BG_29.png'

export default class Home extends React.Component {
  constructor(props){
    super(props)
    this.state={list:[]}
  }
  componentDidMount(){

  }
  onSelect = data => { this.setState(data) }
  render(){
    return (
      <div className="container">
        <div className="row full-screen">
          <div className="col s12 l8">
            <h1 className="title">Consiga un mensajero en minutos.</h1>
            <p className="thin">Llevamos, Recogemos, entregamos, pagamos y hacemos lo que necesite.</p>
            <Link to={"package"} className="btn primary">hacer un pedido</Link>
          </div>
          <div className="col s12 l4">
            <img className="responsive-img shadow-moto" src={distance} alt={"aviamensajeros"}/>
          </div>
        </div>
        <div className="row">
          <h3 className="title">¿Por qué somos mejores?</h3>
          <div className="col s12 l4 center">
            <div className="col s6 offset-s3"><img className="responsive-img shadow-moto" src={money} alt={"oferta la tarifa"}/></div>
            <div className="col s12">
              <h5 className="grey-text text-darken-2">Usted oferta la tarifa</h5>
              <p className="thin grey-text text-darken-1">
                En aviamensajeros es usted decide cuánto pagar por el servicio. Publique una solicitud en la aplicación, especifique un precio justo y encuentra un mensajero.
              </p>
            </div>
          </div>
          <div className="col s12 l4 center">
            <div className="col s6 offset-s3"><img className="responsive-img shadow-moto" src={shield} alt={"oferta la tarifa"}/></div>
            <div className="col s12">
              <h5 className="grey-text text-darken-2">Entrega segura</h5>
              <p className="thin grey-text text-darken-1">
                Usa el servicio sin salir de su casa u oficina. Nuestros mensajeros entregarán su paquete de puerta a puerta. Rápido y seguro.
              </p>
            </div>
          </div>
          <div className="col s12 l4 center">
            <div className="col s6 offset-s3"><img className="responsive-img shadow-moto" src={smartphone} alt={"oferta la tarifa"}/></div>
            <div className="col s12">
              <h5 className="grey-text text-darken-2">Ecommerce Empresas</h5>
              <p className="thin grey-text text-darken-1">
              Envío de contratos, cotizaciones, comprobantes, documentos confidenciales o
              para que su tienda en línea envie a sus usuarios y puedan recibir sus productos el mismo día.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
