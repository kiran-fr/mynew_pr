import React, { Component } from 'react'
import FormComponent from './components/steps/formComponent'
// import FormValid from './form/FormValid'
import PropTypess from './PropTypes'
import './styles/styles.css'
class App extends Component {
    render() {
        return (
            <div style={{backgroundColor:''}}>
              {/* <FormValid/>   */}
              {/* <StepperExample/> */}
              {/* <InputField/> */}
              <FormComponent/>
              {/* <PropTypess name={1}/> */}
            </div>
        )
    }
}

export default App
