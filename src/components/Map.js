import React, { Component } from 'react';
import { Marker, GoogleMap, LoadScript } from '@react-google-maps/api';
import axios from 'axios';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -33.862477,
  lng: 150.951833
};

class Map extends Component {

  state = {
    nearby_walkers: [] //TODO: thisn needs to be an array of pins on the map that show up. 
  }
  
  componentDidMount() {
    // TODO: make the axios call to the backend to get the array of current nearby users. 

    this.loadWalkers();
  }
  
  async loadWalkers() {
    try{
      let res = await axios.get('http://localhost:3000/users/find/-33.8724235/151.2591179');
      this.setState({nearby_walkers: res.data})

      console.log(this.state.nearby_walkers[0])
    }catch (err){
      console.log('Nearby walkers AJAX ERROR:', err)
    }
  }
  
  render() { //TODO: figure out what the markers are like today. 
    return (
      <LoadScript
        googleMapsApiKey="AIzaSyAm7vYw4jkC7m9hbEKpMfFxjwLAOZgxwko"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          
          {
            this.state.nearby_walkers.map( el => {
              <Marker
              icon="https://i.imgur.com/kEXCUkc.png?1"
              // onLoad={onLoad}
              
              position={el.geocode_lat, el.geocode_lng}
              />
            })
          }
          {/* <Marker
            icon="https://i.imgur.com/kEXCUkc.png?1"
            // onLoad={onLoad}
            position={center}
          /> */}

            
          <></>
        </GoogleMap>
      </LoadScript>
    )
  }
}

// const Map = () => { //TODO: Plug in the actual to and from directions for the walker when they accept a job.
//   return (
//     <div className="map">
      
      
      
      
//       <iframe
//           width="450"
//           height="250"
//           frameBorder="0"
//           style={{border:0}}
//           loading="lazy"
//           src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyAm7vYw4jkC7m9hbEKpMfFxjwLAOZgxwko&origin=-33.862477,150.951833&destination=-33.8724235,151.2591179&avoid=tolls|highways"
//           allowFullScreen>
//       </iframe>
//     </div>
//   )
// }

export default Map;