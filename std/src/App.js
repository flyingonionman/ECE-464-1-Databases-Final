import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component {
  state = { statesData: null }

  constructor(props) {
      super(props)
      this.loadData()
  }

  async loadData() {
      const res = await fetch('https://willhaley.com/assets/united-states-map-react/states.json')
      const statesData = await res.json()
      this.setState({ statesData })
  }

  render() {
      if (this.state.statesData === null) {
          return <div>Loading...</div>
      }
      return (
        <Router>
          <div className='App'>
            <div className='App-header'>
                <h2>Citywide graphic representation of HIV/AIDS density and contraception availability.</h2>
            </div>
            <div className='content'>
                <p className='authors'>Minyoung Na and Samuel Makarovskiy</p>
                <div className='contentblock'>
                <h3>
                  Search for things !
                </h3>
            
                
                </div>

               
            </div>

          </div>
        </Router>
        );
  }
}

export default App;
