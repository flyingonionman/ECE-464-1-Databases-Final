import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


const marker_w = 5 ;
const marker_h = 5;
var i = 0
const markerstyle = {
  position: 'absolute',
  width: marker_w,
  height: marker_h,
  backgroundColor: 'white',
  border: '2px solid black',
  borderRadius: marker_h
}

const markerstylehover = {
  ...markerstyle,
  border: '2px solid black',
  backgroundColor: '#91E5F6',
  cursor: 'pointer'
};

const togglestyle ={
    position: 'absolute',
    background: '#4CAF50',
    border: 'none',
    padding: '15px 32px',
    textalign: 'center',
    textdecoration: 'none',
    fontsize: '16px',
    margin: '2% 0%',
    cursor: 'pointer',
    color:'white',
    right:'0'
}
class MapChart extends Component {
  constructor(props) {
    super(props)
    var coords = this.getcoords(this.props.coords)
    
    this.state = { 
      zipcode : this.props.coords,
      heatmapVisible: false,
      heatmapPoints: coords,
      test: ''
    }

  }
  static defaultProps = {
    center: {
      lat: 40.7128 ,
      lng: -74.0060
    },
    zoom: 11
  };

  onMapClick({x, y, lat, lng, event}) {
  }

  getcoords(coordinates){
    var lat = this.pluck(coordinates, "Latitude");
    var lng = this.pluck(coordinates, "Longitude");
    var coords = []
    let temp = {};
    for(let i=0; i<lat.length; i++) {
      temp = {lat :lat[i],lng : lng[i]}
      coords.push(temp);
    }

    return coords
  }
 
  componentDidUpdate(prevProps) {
    if (this.props.coords !== prevProps.coords) {
      this.setState({
         heatmapPoints : this.getcoords(this.props.coords)
      })
    }
  }
  

  pluck(array, key) {
    return array.map(function(item) { return item[key]; });
  }
  
  toggleHeatMap() {    
    console.log("pressed!")
    this.setState({
      heatmapVisible: !this.state.heatmapVisible
    }, () => {
      if (this._googleMap !== undefined) {
        this._googleMap.heatmap.setMap(this.state.heatmapVisible ? this._googleMap.map_ : null)
      }      
    })

  }

  render() {

    const heatMapData = {
  		positions: this.state.heatmapPoints,
      options: {
        radius: 15,
        opacity: .8
	  	}
  	}
    const marker = this.props.$hover ? markerstylehover : markerstyle;
    const AnyReactComponent = ({ text }) => <div style={marker}>{text}</div>;

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '80vh', width: '100%'  }}>
        <GoogleMapReact
          ref={(el) => this._googleMap = el}
          bootstrapURLKeys={{ key:"AIzaSyD-J8k2QBUslpsCZu0dhY_p5qGXDk8XHDA" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          hoverDistance={23}
          heatmapLibrary={true}          
          heatmap={heatMapData}  
          onClick={this.onMapClick.bind(this)}

        >
          <AnyReactComponent
            lat={40.7128}
            lng={-74.0060}
            text=""
          />
        </GoogleMapReact>
        <button style={togglestyle} onClick={this.toggleHeatMap.bind(this)}>Toggle heatmap</button>

      </div>
    );
  }
}

export default MapChart;
