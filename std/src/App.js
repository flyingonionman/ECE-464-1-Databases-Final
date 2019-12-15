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
      isLoading: true,
      value:"East Harlem"
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

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
     event.preventDefault();
     
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
                    <select  value={this.state.value} onChange={this.handleChange}>
                      <option value='Bayside and Little Neck'>Bayside and Little Neck</option>
                      <option value='Bedford Stuyvesant and Crown Heights'>Bedford Stuyvesant and Crown Heights</option>
                      <option value='Bensonhurst and Bay Ridge'>Bensonhurst and Bay Ridge</option>
                      <option value='Borough Park'>Borough Park</option>
                      <option value='Canarsie and Flatlands'>Canarsie and Flatlands</option>
                      <option value='Central Harlem and Morningside Heights'>Central Harlem and Morningside Heights</option>
                      <option value='Chelsea and Clinton'>Chelsea and Clinton</option>
                      <option value='Coney Island and Sheepshead Bay'>Coney Island and Sheepshead Bay</option>
                      <option value='Crotona and Tremont'>Crotona and Tremont</option>
                      <option value='Downtown and Heights and Park Slope'>Downtown and Heights and Park Slope</option>                      
                      <option value="East Flatbush and Flatbush">East Flatbush and Flatbush</option>
                      
                      <option value='East Harlem'>East Harlem</option>
                      <option value='East New York'>East New York</option>
                      <option value='Flushing and Clearview'>Flushing and Clearview</option>
                      <option value='Fordham and Bronx Park'>Fordham and Bronx Park</option>
                      <option value='Fresh Meadows'>Fresh Meadows</option>
                      <option value='Gramercy Park and Murray Hill'>Gramercy Park and Murray Hill</option>
                      <option value='Greenpoint'>Greenpoint</option>
                      <option value='Greenwich Village and SoHo'>Greenwich Village and SoHo</option>
                      <option value='High Bridge and Morrisania'>High Bridge and Morrisania</option>
                      <option value='Hunts Point and Mott Haven'>Hunts Point and Mott Haven</option>                      
                      <option value="Jamaica">Jamaica</option>
                      
                      <option value='Kingsbridge and Riverdale'>Kingsbridge and Riverdale</option>
                      <option value='Long Island City and Astoria'>Long Island City and Astoria</option>
                      <option value='Lower Manhattan'>Lower Manhattan</option>
                      <option value='Northeast Bronx'>Northeast Bronxk</option>
                      <option value='Pelham and Throgs Neck'>Pelham and Throgs Neck</option>
                      <option value='Port Richmond'>Port Richmond</option>
                      <option value='Ridgewood and Forest Hills'>Ridgewood and Forest Hills</option>
                      <option value='Rockaway'>Rockaway</option>
                      <option value='South Beach and Tottenville'>South Beach and Tottenville</option>
                      <option value='Southeast Queens'>Southeast Queens</option>                      
                      <option value="Stapleton and St. George">Stapleton and St. George</option>

                      <option value='Sunset Park'>Sunset Park</option>
                      <option value='Union Square and Lower Eastside'>Union Square and Lower Eastside</option>
                      <option value='Upper Eastside'>Upper Eastside</option>
                      <option value='Upper Westside'>Upper Westside</option>                      
                      <option value="Washington Heights and Inwood">Washington Heights and Inwood</option>

                      <option value='West Queens'>West Queens</option>
                      <option selected value="Williamsburg and Bushwick">Coconut</option>
                      <option value='Willowbrook'>Willowbrook</option>

                      <option value="mango">Mango</option>
                    </select>
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
