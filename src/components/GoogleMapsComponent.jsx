import React from 'react'
import {APIProvider, Map} from '@vis.gl/react-google-maps';

// A sintaxe para importar algo do .env é diferente dependendo do template em que o projeto foi criado:

// Se for pelo Create React App (CRA), utiliza-se: process.env.REACT_APP_...
// Se o projeto for criado usando VITE, utiliza-se: import.meta.env.VITE_...

const GoogleMapsComponent = () => {
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    return (
        <APIProvider apiKey={API_KEY}>
            <div className='w-full h-full'>
                <Map
                defaultCenter={{lat: 22.54992, lng: 0}}
                defaultZoom={9}
                gestureHandling='greedy'
                disableDefaultUI
                />                
            </div>

        </APIProvider>
    )
}

export default GoogleMapsComponent
