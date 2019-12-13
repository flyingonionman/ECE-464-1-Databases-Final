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
                  How do I gather mental health data?
                </h3>
                <p>I'm Using Kaggle.com on <a className='link' href="https://www.kaggle.com/osmi/mental-health-in-tech-survey/data">dataset of mental health</a>.
                This dataset is interesting because it looks at individuals working in a tech workplace. It also has some geographical data ( states ) 
                of the individuals and allow me to see any future trends
                </p>

                <h4>
                  How a raw data would look like ( JSON format )
                </h4>
                <p className="code">
                
                    "Timestamp": "2014-08-27 11:29:31",
                    "Age": 37,
                    "Gender": "Female",
                    "Country": "United States",
                    "state": "IL",
                    "self_employed": "NA",
                    "family_history": "No",
                    "treatment": "Yes",
                    "work_interfere": "Often",
                    "no_employees": "6-25",
                    "remote_work": "No",
                    "tech_company": "Yes",
                    "benefits": "Yes",
                    "care_options": "Not sure",
                    "wellness_program": "No",
                    "seek_help": "Yes",
                    "anonymity": "Yes",
                    "leave": "Somewhat easy",
                    "mental_health_consequence": "No",
                    "phys_health_consequence": "No",
                    "coworkers": "Some of them",
                    "supervisor": "Yes",
                    "mental_health_interview": "No",
                    "phys_health_interview": "Maybe",
                    "mental_vs_physical": "Yes",
                    "obs_consequence": "No",
                    "comments": "NA"
                
                </p>

                <p>
                 Another endpoint I can view the data is how things may have changed over the course of years.
                 <a className='link' href="https://www.kaggle.com/osmi/mental-health-in-tech-survey/data">Dataset on suicide</a> is great
                 because it has very extensive amount of data ( age groups / years / gender / Country. At the same time, we should be careful on 
                 drawing out correlation from this as suicide is not necessarily an indication of mental illness.
                </p>
                </div>

                <div className='contentblock'>
                <h3>
                  How do I gather social media use data?
                </h3>
                <p>
                  There is an ample amount of data about mental health and even more studies done on that data. Though there aren't many good interactive
                  data visualizations I found on the topic, it would not be so difficult to create one. The real challenge I believe, comes 
                  from the fact that I'm trying to establish a correlation ( or lack there of ) between mental health and social media usage.
                  And to my surprise, not a lot of user metadata is revealed to the public ( user's posting frequency / user age and usage patterns). My intuition is that 
                  data can be expensive; these informations are indeed valuable and have no need to be public.
                </p>
                <p>
                  Firstly, we have to distinguish what we count as social media. Facebook is a type of social media that focuses on user to user
                  interaction. Reddit, on the other hand is similar but focuses more on centralized user hub ( called sub-reddits ). With this 
                  argument, we can treat wikipedia as a piece of social media.
                  <a className='link' href="https://www.kaggle.com/c/web-traffic-time-series-forecasting/data">Wikipedia traffic database</a> is an 
                  entry point I can look at. 

                </p>

                <p>
                  If I can't find available datasets, I can generate my own datasets by parsing information online and hosting it on a database.
                  I'm currently have a cluster up and running at a MongoDB Atlas cluster.
                </p>
                
                </div>

                <div className='contentblock'>
                <h3>
                  How do I mix them up and display them?
                </h3>
                <p>There are multiple ways to represent the combination of data. Mainly on the front-end, I am choosing to 
                  use D3.js to display some sort of a map. The below is a map of the united states.
                </p>

                </div>
               
            </div>

          </div>
        </Router>
        );
  }
}

export default App;
