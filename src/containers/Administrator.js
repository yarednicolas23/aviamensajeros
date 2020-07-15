import React from 'react'
export default class Administrator extends React.Component {
  constructor(props){
    super(props)
    this.state={list:[]}
  }
  componentDidMount(){
    this.props.database.ref('order').on('value',(snap)=>{
      console.log(snap.val())
      this.state.list=[]
      //this.setState({list:{}})
      snap.forEach((childSnapshot)=> {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        childData.key= childKey
        this.state.list.push(childData)
      })
      this.setState(this.state)
      console.log(this.state.list)
    })
  }
  takeOrder(data){
    var id= data.key
    data.courier=1
    data.key=null
    this.props.database.ref('order/'+id).set(data)
  }
  onSelect = data => { this.setState(data) }
  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
                <th>Tipo</th>
                <th>Tipo de pago</th>
                <th>Oferta de pago</th>
                <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {
              this.state.list.map((order,key)=>
                <tr key={key}>
                  <td>{order.package}</td>
                  <td>{order.pay}</td>
                  <td>{order.paymentoffer}</td>
                  <td><button onClick={()=>this.takeOrder(order)} className="btn primary waves-effect">Tomar</button></td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
}
