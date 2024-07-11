import React from 'react'
import {Loading} from '../Loading/Loading'


const SECURITY_CODE = 'paradigma'

class ClassState extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      value:'',
      error: false ,
      loading:false,
    }
  }

  // UNSAFE_componentWillMount(){ esta cosa funciona como el useEffect que se ejecuta una sola vez
  //   console.log('will Mount')
  // }

  // componentDidMount(){
  //   console.log('did Mount')
  // }

  componentDidUpdate(){
    if (!!this.state.loading) {
      setTimeout(() => {
        if(SECURITY_CODE === this.state.value){
        this.setState({loading:false})
        }else{
          this.setState({loading: false, error: true})
        }
      }, 3000)
    }
    console.log('alo')
  }
  render(){
    const {name} = this.props
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el codigo ded seguridad.</p>
        {this.state.error && (
          <p>Error: El codigo es incorrecto</p>
        )}
        {this.state.loading && (
          <Loading />
        )}
        <input placeholder='Codigo de seguridad'
        value= {this.state.value}
        onChange= {(event)=>{
          this.setState({value: event.target.value})
        }}
        />
        <button onClick={()=> this.setState({loading: true,error:false})}>Comprobar</button>
      </div>
    )
  }

}

export {ClassState}