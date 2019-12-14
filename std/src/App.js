import React,{Text} from 'react';
import './App.css';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import MapChart from "./MapChart";

class App extends React.Component {
  state = { 
      statesData: null ,
      condom:[],
      isLoading: true

  }

  constructor(props) {
      super(props)
      this.loadData()
  }

  async loadData() {
      const res = await fetch('https://willhaley.com/assets/united-states-map-react/states.json')
      const statesData = await res.json()
      this.setState({ statesData })
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/condom`)
      .then(res => {
        const condom = res.data;
        this.setState({ condom });
        this.setState({isLoading : false });
      })
  }

  render() {
      if (this.state.statesData === null) {
          return <div>Loading...</div>
      }

      const {isLoading ,condom} = this.state;

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
                <MapChart/>
                
                <form onSubmit={this.handleSubmit}>
                  <label>
                    Place:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                  </label>
                  <input type="submit" value="Submit" />
                </form>

                {!isLoading ? (
                  condom.map(condom => {
                    const { FacilityPK, FacilityName, ServiceCategory,ServiceType,PartnerTypeDetailed,Address,Zipcode } = condom;
                    return (
                      <div key={FacilityPK}>
                        <p>Facility Name: {FacilityName}</p>
                        <p>Service Category: {ServiceCategory}</p>
                        <p>Service Type: {ServiceType}</p>
                        <p>Detailed Partner Type: {PartnerTypeDetailed}</p>
                        <p>Address: {Address}</p>
                        <p>Zipcode: {Zipcode}</p>

                        <hr />
                      </div>
                    );
                  })
                // If there is a delay in data, let's let the user know it's loading
                ) : (
                  <h3>Loading...</h3>
                )}

                
                

                </div>
            </div>

          </div>
        </Router>
        );
  }
}

export default App;
