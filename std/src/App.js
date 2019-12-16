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
  constructor(props) {
      super(props)
      this.loadData()

      this.state = { 
        statesData: null ,
        condom:[],
        zipcode:[],
        facility:[],
        isLoading: true,
        ismapLoading:true,
        value:"East Harlem",
        year:"2012"
      }

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleyearChange = this.handleyearChange.bind(this);

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
        this.setState({ismapLoading : false });

      })
  }

  handleChange(event) {
    this.setState({value: event.target.value});

  }

  handleyearChange(event) {
    this.setState({year: event.target.value});
    console.log(this.state.year)
  }

  handleSubmit(event) {
     event.preventDefault();
     const zipcode = [];
     this.setState({ zipcode });

     axios.get('http://localhost:5000/neigh/' + this.state.value, {
    })
      .then(res => {
        const zipcode = res.data;
        const condom = res.data;
        this.setState({ condom });
        this.setState({ zipcode });
      })

    axios.get('http://localhost:5000/diagnoses/' + this.state.year, {
    })
      .then(res => {
        const facility = res.data.find(element => element.Neighborhood == this.state.value)
        this.setState({ facility });
        console.log(this.state.facility.HIVAIDS_Diagnoses)
      })
    
      this.setState({isLoading : false });

  }


  render() {
      if (this.state.statesData === null) {
          return <div>Loading...</div>
      }

      const {isLoading ,condom,zipcode,ismapLoading,facility} = this.state;

      return (
        <Router>
          <div className='App'>
            <div className='App-header'>
                <h2>Citywide graphic representation of HIV/AIDS density and contraception availability.</h2>
            </div>
            <div className='content'>
                <p className='authors'>Minyoung Na and Samuel Makarovskiy</p>
                <div className='contentblock'>
                
                
                <div className="navigation">
                  <ul>
                    <li><a href="#facilities">Facilities</a></li>
                    <li><a href="#hiv">HIV cases</a></li>
                  </ul>
                </div>

                {!ismapLoading ? <MapChart coords={condom} facility={facility}/> : null }

                <form onSubmit={this.handleSubmit}>
                  <label>
                   
                    <select className ="custom-select " value={this.state.value} onChange={this.handleChange}>
                      <option value='Bedford Stuyvesant and Crown Heights'>Bedford Stuyvesant and Crown Heights</option>
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
                      <option value='South Beach and Tottenville'>South Beach and Tottenville</option>
                      <option value='Southeast Queens'>Southeast Queens</option>                      
                      <option value="Stapleton and St. George">Stapleton and St. George</option>

                      <option value='Sunset Park'>Sunset Park</option>
                      <option value='Union Square and Lower Eastside'>Union Square and Lower Eastside</option>
                      <option value='Upper Eastside'>Upper Eastside</option>
                      <option value='Upper Westside'>Upper Westside</option>                      
                      <option value="Washington Heights and Inwood">Washington Heights and Inwood</option>

                      <option value='West Queens'>West Queens</option>
                      <option  value="Williamsburg and Bushwick">Williamsburg and Bushwick</option>
                    </select>
                    
                    <select className ="custom-select " value={this.state.year} onChange={this.handleyearChange}>
                      <option value="2010">2010</option>
                      <option value="2011">2011</option>
                      <option value="2012">2012</option>
                      <option value="2013">2013</option>
                    </select>
                  </label>
                  <input className ="custom-select-button" type="submit" value="Search" />
                </form>

               
                {!isLoading ? <h4>Total number of HIV patients in year {this.state.year} :  {JSON.stringify(facility.HIVAIDS_Diagnoses)}</h4> : null }


                {!isLoading ? (
                  zipcode.map(zipcode => {
                    const {  FacilityName, latitude,longitude,Neighborhood,Zipcode } = zipcode;
                    return (
                      <div>
                        <div className ="lister" key={FacilityName}>
                          <p>Facility Name: {FacilityName}</p>
                          <p>Neighborhood: {Neighborhood}</p>
                          <p>Zipcode: {Zipcode}</p>
                          <hr />
                        </div>
                      </div>
                    );
                  })
                // If there is a delay in data, let's let the user know it's loading
                ) : (
                  <h3>Choose a neighborhood</h3>
                )}

                
                

                </div>
            </div>

          </div>
        </Router>
        );
  }
}

export default App;
