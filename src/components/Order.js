import React from 'react'
import motorcycle from './../assets/motorcycle.svg'
import moverTruck from './../assets/mover-truck.svg'
import envelope from './../assets/envelope.svg'
import box from './../assets/box.svg'
import globe from './../assets/globe.svg'
import fastDelivery from './../assets/fast-delivery.svg'
import calendar from './../assets/delivery-24.svg'
import money from './../assets/money.svg'


import 'materialize-css/dist/css/materialize.min.css'

import '.././App.css'

class Button extends React.Component{
  constructor(props){
    super(props)
  }
  getImg(title){
    if (this.props.title==='Liviano'){return motorcycle}
    if (this.props.title==='Pesado'){return moverTruck}
    if (this.props.title==='Documentos'){return envelope}
    if (this.props.title==='Caja'){return box}
    if (this.props.title==='Agendar'){return calendar}
    if (this.props.title==='Ahora'){return fastDelivery}
    if (this.props.title==='Bogotá'){return globe}
    if (this.props.title==='Medellín'){return globe}
    if (this.props.title==='Efectivo'){return money}
  }
  handleClick(v){
    this.props.onSelect({step:v+1})
    if (this.props.state.step===1){ this.props.state.summary.transport=this.props.title}
    if (this.props.state.step===2){ this.props.state.summary.package=this.props.title}
    if (this.props.state.step===3){ this.props.state.summary.city=this.props.title}
    if (this.props.state.step===5){ this.props.state.summary.when=this.props.title}

  }
  render(){
    return (
      <div className="float-card" onClick={()=>this.handleClick(this.props.state.step)}>
        <img className="order-icon" src={this.getImg(this.props.title)} alt={this.props.title}/>
        <h3 className="thin">{this.props.title}</h3>
      </div>
    );
  }
}

class Type extends React.Component{
  constructor(props){
    super(props)
  }
  handleClick(v){console.log(v)}
  render(){
    return (
      <div className="col s12">
        <Button title="Express"/>
        <Button title="Carga"/>
      </div>
    );
  }
}

class Steps extends React.Component{
  constructor(props){
    super(props)
    this.state={
      step:1,
      summary:{
        transport:"Liviano",
        package:"Documentos",
        city:"Bogotá",
        road:{
          from:{address:"",task:""},
          to:{address:"",task:""}
        },
        when:"Ahora",
        payment:{type:"Efectivo",value:null}
      }
    }
  }
  handleChangeFromAddress=event=> {
    this.state.summary.road.from.address= event.target.value
    this.setState(this.state)
  }
  handleChangeFromTask=event=>{
    this.state.summary.road.from.task= event.target.value
    this.setState(this.state)
  }
  handleChangeToAddress=event=>{
    this.state.summary.road.to.address= event.target.value
    this.setState(this.state)
  }
  handleChangeToTask=event=>{
    this.state.summary.road.to.task= event.target.value
    this.setState(this.state)
  }
  handleChangePaymetValue=event=>{
    this.state.summary.road.to.task= event.target.value
    this.setState(this.state)
  }
  getImg(title){
    if (title==='Liviano'){return motorcycle}
    if (title==='Pesado'){return moverTruck}
    if (title==='Documentos'){return envelope}
    if (title==='Caja'){return box}
    if (title==='Agendar'){return calendar}
    if (title==='Ahora'){return fastDelivery}
    if (title==='Bogotá'){return globe}
    if (title==='Medellín'){return globe}
    if (title==='Efectivo'){return money}
  }
  formatNumber=event=>{
    // format number 1000000 to 1,234,567
    this.state.summary.payment.value= event.target.value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    this.setState(this.state)
  }

  onSelect = data => { this.setState(data) }
  render(){
    return (
      <div className="row poppins">
        <div className="col s12">
          <Progress step={this.state.step}/>
        </div>
        {
          this.state.step===1?
          <div className="col s12 center">
            <h3 className="title grey-text text-darken-3">¿Qué va a transportar?</h3>
            <div className="cards-container">
              <Button title="Liviano" onSelect={this.onSelect} state={this.state}/>
            </div>
          </div>
          :this.state.step===2?
          <div className="col s12 center">
            <h3 className="title grey-text text-darken-3">¿Qué paquete desea enviar?</h3>
            <div className="cards-container">
              <Button title="Documentos" onSelect={this.onSelect} state={this.state}/>
              <Button title="Caja" onSelect={this.onSelect} state={this.state}/>
            </div>
          </div>
          :this.state.step===3?
          <div className="col s12 center">
            <h3 className="title grey-text text-darken-3">Seleccione la cuidad</h3>
              <div className="cards-container">
              <Button title="Bogotá" onSelect={this.onSelect} state={this.state}/>
              <Button title="Medellín" onSelect={this.onSelect} state={this.state}/>
            </div>
          </div>
          :this.state.step===4?
          <div className="col s12">
            <form className="container" onSubmit={()=>this.setState({step:this.state.step+1})}>
              <h3 className="title grey-text text-darken-3">¿Donde recogemos?</h3>
              <div className="input-field col s12">
                <input value={this.state.summary.road.from.address} onChange={this.handleChangeFromAddress} id="where" placeholder="Escriba la dirección" type="text" className="validate" required/>
                <span className="helper-text hide">Escriba la direccion</span>
              </div>
              <div className="input-field col s12">
                <textarea value={this.state.summary.road.from.task} onChange={this.handleChangeFromTask} id="how" placeholder="¿Que debe hacer el mensajero?" className="materialize-textarea"></textarea>
                <span className="helper-text hide">¿Que debe hacer el mensajero?</span>
              </div>
              <h3 className="title grey-text text-darken-3">¿A donde lo llevamos?</h3>
              <div className="input-field col s12">
                <input value={this.state.summary.road.to.address} onChange={this.handleChangeToAddress} id="where" placeholder="Escriba la dirección" type="text" className="validate"/>
              </div>
              <div className="input-field col s12">
                <textarea value={this.state.summary.road.to.task} onChange={this.handleChangeToTask} id="how" placeholder="¿Que debe hacer el mensajero?" className="materialize-textarea"></textarea>
              </div>
              <button className="primary btn waves-effect waves-light col s12" type="submit" name="action">Confirmar</button>
            </form>
          </div>
          :this.state.step===5?
          <div className="col s12 center">
            <h3 className="title grey-text text-darken-3">¿Cuando lo llevamos?</h3>
            <div className="cards-container">
              <Button title="Ahora" onSelect={this.onSelect} state={this.state}/>
              <Button title="Agendar" onSelect={this.onSelect} state={this.state}/>
            </div>
          </div>
          :this.state.step===6?
          <div className="col s12 center">
            <h3 className="title grey-text text-darken-3">¿Como desea pagar?</h3>
            <div className="cards-container">
              <Button title="Efectivo" onSelect={this.onSelect} state={this.state}/>
            </div>
          </div>
          :
          this.state.step===7?
          <div className="col s12">
            <div className="container center">
              <h3 className="poppins grey-text text-darken-3">¿Cuanto desea pagar?</h3>
              <div className="input-field col s12">
                <input value={this.state.summary.payment.value} onChange={this.formatNumber} id="price" placeholder="15,000" type="text" className="validate" required/>
                <span className="helper-text hide">Escriba la direccion</span>
              </div>
              <button className="primary btn waves-effect waves-light col s12" type="submit" name="action" onClick={()=>this.setState({step:this.state.step+1})}>Confirmar</button>
            </div>
          </div>
          :
          this.state.step===8?
          <div className="col s12">
            <div className="container center">
              <h3 className="poppins grey-text text-darken-3">Resumen del pedido:</h3>
              <div className="col s6 l3">
                <img className="responsive-img" src={this.getImg(this.state.summary.transport)} alt={this.state.summary.transport}/>
                <h6 className="no-margin grey-text"><b>Tipo:</b></h6>
                <h6 className="poppins">{this.state.summary.transport}</h6>
              </div>
              <div className="col s6 l3">
                <img className="responsive-img" src={this.getImg(this.state.summary.package)} alt={this.state.summary.package}/>
                <h6 className="no-margin grey-text"><b>Paquete:</b></h6>
                <h6 className="poppins">{this.state.summary.package}</h6>
              </div>
              <div className="col s6 l3">
                <img className="responsive-img" src={this.getImg(this.state.summary.when)} alt={this.state.summary.when}/>
                <h6 className="no-margin grey-text"><b>Fecha:</b></h6>
                <h6 className="poppins">{this.state.summary.when}</h6>
              </div>
              <div className="col s6 l3">
                <img className="responsive-img" src={this.getImg(this.state.summary.payment.type)} alt={this.state.summary.payment}/>
                <h6 className="no-margin grey-text"><b>Pago {this.state.summary.payment.type}:</b></h6>
                <h6 className="poppins">${this.state.summary.payment.value}</h6>
              </div>
              <div className="col s12"><h1></h1></div>
              <div className="col s12">
                <table className="striped">
                  <tbody>
                    <tr>
                      <td className="thin grey-text text-darken-3">Cuidad</td>
                      <th className="poppins">{this.state.summary.city}</th>
                    </tr>
                    <tr>
                      <td className="thin grey-text text-darken-3">Dirección de recogida</td>
                      <th className="poppins">{this.state.summary.road.from.address}</th>
                    </tr>
                    <tr>
                      <td className="thin grey-text text-darken-3">Tarea en dirección de recogida</td>
                      <th className="poppins">{this.state.summary.road.from.task}</th>
                    </tr>
                    <tr>
                      <td className="thin grey-text text-darken-3">Dirección de entrega</td>
                      <th className="poppins">{this.state.summary.road.to.address}</th>
                    </tr>
                    <tr>
                      <td className="thin grey-text text-darken-3">Tarea en dirección de entrega</td>
                      <th className="poppins">{this.state.summary.road.to.task}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          :
          <div></div>
        }
      </div>
    );
  }
}

function Progress(props){
  return(
    <div>
      <h5 className="poppins grey-text text-darken-2">Paso {props.step} de 8</h5>
      <div className="progress">
        <div className="determinate" style={{width:props.step*1.25*10+'%'}}></div>
      </div>
    </div>
  )
}
export default class Order extends React.Component {
  constructor(props){
    super(props)
    this.state={
      step:1
    }
  }
  onSelect = data => { this.setState(data) }
  render() {
    return (
      <div>
      <Steps/>
      </div>
    );
  }
}
