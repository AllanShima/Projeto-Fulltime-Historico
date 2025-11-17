import React, { useEffect, useState } from 'react'
import {
    APIProvider, 
    Map, 
    useApiIsLoaded
} from '@vis.gl/react-google-maps';

// A sintaxe para importar algo do .env é diferente dependendo do template em que o projeto foi criado:

// Se for pelo Create React App (CRA), utiliza-se: process.env.REACT_APP_...
// Se o projeto for criado usando VITE, utiliza-se: import.meta.env.VITE_...

const ENDERECO_DESEJADO = "Av. Paulista, 1578, São Paulo, Brasil";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const GeocodeComponent = () => {
    // Estado para armazenar as coordenadas geográficas
    const [coordenadas, setCoordenadas] = useState(null);
    const apiLoaded = useApiIsLoaded(); // Hook para saber se a API do Google Maps já carregou

    useEffect(() => {
        // Verifica se a API do Google Maps (google.maps) carregou com sucesso
        if (apiLoaded) {
            // Cria uma nova instância do Geocoder
            const geocoder = new google.maps.Geocoder();

            // Chama o método geocode com o endereço
            geocoder.geocode({ address: ENDERECO_DESEJADO }, (results, status) => {
                if (status === 'OK' && results.length > 0) {
                    const location = results[0].geometry.location;
                    
                    // Armazena a latitude e longitude
                    setCoordenadas({
                        lat: location.lat(),
                        lng: location.lng(),
                    });

                    // Exibe no console
                    console.log(`Endereço: ${ENDERECO_DESEJADO}`);
                    console.log(`Latitude: ${location.lat()}`);
                    console.log(`Longitude: ${location.lng()}`);

                } else {
                    console.error('Geocoding falhou devido a: ' + status);
                    // O status mais comum se a API não estiver habilitada ou a chave for inválida é 'ZERO_RESULTS'
                }
            });
        }
    }, [apiLoaded]); // Executa sempre que o estado da API muda para 'loaded'

    // Define o centro do mapa para as coordenadas encontradas ou um valor padrão
    const center = coordenadas || { lat: 22.54992, lng: 0 };
    const zoom = coordenadas ? 15 : 3; // Aumenta o zoom se as coordenadas forem encontradas

    return (
        <Map
            center={center}
            zoom={zoom}
            gestureHandling='greedy'
            disableDefaultUI
        />
    );
};

const GoogleMapsComponent = () => {

    return (
        <APIProvider apiKey={API_KEY} libraries={['marker', 'geometry']}>
            <div className='w-full h-full'>
                <GeocodeComponent/>           
            </div>
        </APIProvider>
    )
}

export default GoogleMapsComponent
