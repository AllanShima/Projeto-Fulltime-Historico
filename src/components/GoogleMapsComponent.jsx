import React, { useEffect, useState } from 'react'
import {
    APIProvider, 
    Map, 
    useApiIsLoaded,
    // 💡 Importamos os componentes para o Popup/Marcador
    Marker,
    InfoWindow 
} from '@vis.gl/react-google-maps';

// const ENDERECO_DESEJADO = "Av. Paulista, 1578, São Paulo, Brasil";
const API_KEY = 'AIzaSyA8d0Ei0JfjStQcFXOQ0FxG7GSYXZOx7EI';

const MAP_ID = '6dc58fdc85a46b2e8d994e53'; // nova instancia

// 1. Defina o nível de zoom a partir do qual o Popup deve aparecer
const MIN_ZOOM_FOR_POPUP = 15;

const GeocodeComponent = ({selectedAddress="Av. Paulista, 1578, São Paulo, Brasil"}) => {
    const [coordenadas, setCoordenadas] = useState(null);
    const [mapZoom, setMapZoom] = useState(null); // 💡 Novo estado para rastrear o zoom
    const apiLoaded = useApiIsLoaded(); 
    // ... outros estados (currentEvents, userContacts, monitorContacts) ...

    useEffect(() => {
        // ... (sua lógica de Geocoding para obter setCoordenadas) ...
        if (apiLoaded && selectedAddress) {
            console.log("Atualizou??");
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ address: selectedAddress }, (results, status) => {
                if (status === 'OK' && results.length > 0) {
                    const location = results[0].geometry.location;
                    
                    setCoordenadas({
                        lat: location.lat(),
                        lng: location.lng(),
                    });
                    
                    // console.log(...)
                } else {
                    console.error('Geocoding falhou devido a: ' + status);
                }
            });
        }
    }, [apiLoaded, selectedAddress]);

    // Define o centro do mapa para as coordenadas encontradas ou um valor padrão
    const center = coordenadas || { lat: 22.54992, lng: 0 };
    // O zoom inicial será 15 se as coordenadas forem encontradas
    const initialZoom = coordenadas ? MIN_ZOOM_FOR_POPUP : 3; 

    // Função chamada quando o zoom do mapa muda
    const handleMapZoomChange = (event) => {
        setMapZoom(event.detail.zoom);
    };

    // 💡 Condição para exibir o Popup
    const showPopup = coordenadas && mapZoom >= MIN_ZOOM_FOR_POPUP;

    // Dentro de GeocodeComponent

    return (
        // 💡 NOVO: Use um div como contêiner principal flexível e de altura total
        <div className='flex flex-col w-full h-full'> 
            
            {/* 1. O Cabeçalho (Altura Fixa: h-10) */}
            <div className='flex justify-center items-center w-full h-10 bg-gray-100 font-light'>
                
                {/* O conteúdo do cabeçalho pode ser simplificado (não relacionado ao erro) */}
                <h1>
                    {selectedAddress === "Av. Paulista, 1578, São Paulo, Brasil" 
                        ? "(Endereço Padrão)" 
                        : selectedAddress}
                </h1>
            </div>

            {/* 2. O Mapa (Altura Flexível: flex-1) */}
            <Map
                // 💡 Adicione a classe flex-1 para ocupar o espaço restante
                className='flex-1' 
                center={center}
                zoom={initialZoom}
                gestureHandling='greedy'
                disableDefaultUI
                onZoomChanged={handleMapZoomChange} 
            >
                <Marker position={coordenadas}>
                    {/* O InfoWindow é o nosso "Popup". 
                    Ele será exibido condicionalmente baseado no zoom.*/}
                    {showPopup && (
                        <InfoWindow 
                            position={coordenadas} 
                            // O disableAutoPan garante que o mapa não se mova para centralizar o popup
                            disableAutoPan={true}
                        >
                            <div style={{ padding: '5px' }}>
                                📌 Local Exato do Endereço
                            </div>
                        </InfoWindow>
                    )}
                </Marker>
            </Map>
        </div>
    );
};

const GoogleMapsComponent = ({selectedAddress}) => {
    return (
        // 💡 Certifique-se de que 'geometry' está nas libraries para o Circle funcionar
        <APIProvider 
        apiKey={API_KEY} 
        mapId={MAP_ID}
        libraries={['marker', 'geometry']}
        > 
            <div className='w-full h-full'>
                <GeocodeComponent selectedAddress={selectedAddress}/>
            </div>
        </APIProvider>
    )
}

export default GoogleMapsComponent