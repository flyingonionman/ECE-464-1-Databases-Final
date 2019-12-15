import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class MapChart extends Component {
  static defaultProps = {
    center: {
      lat: 40.7128 ,
      lng: -74.0060
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '80vh', width: '100%'  }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:"AIzaSyD-J8k2QBUslpsCZu0dhY_p5qGXDk8XHDA" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={40.7831}
            lng={73.9712}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default MapChart;