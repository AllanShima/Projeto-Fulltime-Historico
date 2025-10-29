import React from 'react'
import {APIProvider, Map} from '@vis.gl/react-google-maps';

const GoogleMapsComponent = () => {
  return (
    <APIProvider apiKey={API_KEY}>
        <Map
        style={{width: '100vw', height: '100vh'}}
        defaultCenter={{lat: 22.54992, lng: 0}}
        defaultZoom={3}
        gestureHandling='greedy'
        disableDefaultUI
        />
    </APIProvider>
  )
}

export default GoogleMapsComponent
