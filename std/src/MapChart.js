import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


const marker_w = 7 ;
const marker_h = 7;

const markerstyle = {
  position: 'absolute',
  width: marker_w,
  height: marker_h,
  backgroundColor: '#CD5C5C',
  border: '2px solid black',
  borderRadius: marker_h
}

const markerstylehover = {
  ...markerstyle,
  border: '2px solid black',
  backgroundColor: '#91E5F6',
  cursor: 'pointer'
};

class MapChart extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      zipcode : this.props.coords,
      heatmapVisible: true,
  		heatmapPoints: [
		  		{lat: 40.7128 , lng: -74.0060},
					{lat: 40.7128 , lng: -74.0060}
				]
    }
  }
  static defaultProps = {
    center: {
      lat: 40.7128 ,
      lng: -74.0060
    },
    zoom: 11
  };


  render() {

    const heatMapData = {
  		positions: this.state.heatmapPoints,
      options: {
        radius: 20,
        opacity: 0.6
	  	}
  	}
    const marker = this.props.$hover ? markerstylehover : markerstyle;
    const AnyReactComponent = ({ text }) => <div style={marker}>{text}</div>;

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '80vh', width: '100%'  }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:"AIzaSyD-J8k2QBUslpsCZu0dhY_p5qGXDk8XHDA" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          hoverDistance={23}
          heatmapLibrary={true}          
          heatmap={heatMapData}  
        >
          <AnyReactComponent
            lat={40.7128}
            lng={-74.0060}
            text=""
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default MapChart;
