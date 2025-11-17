import { useMapsLibrary } from '@vis.gl/react-google-maps';
import React from 'react'

const reverseGeocode = (lat, lng, geocodingLibrary, callback) => {

    // Verifica se a biblioteca de Geocoding está carregada
    if (!geocodingLibrary || typeof geocodingLibrary.Geocoder !== 'function') {
        window.alert("ERRO: A biblioteca de Geocoding não está carregada corretamente.");
        console.error("ERRO: Biblioteca de Geocoding está faltando ou é inválida.");
        return;
    }
    
    // Se o código falha ANTES de executar esta linha, a variável é inválida
    const geocoder = new geocodingLibrary.Geocoder(); 
        
    // 1. Cria o objeto LatLng
    const latLng = new google.maps.LatLng(lat, lng);

    // 2. Chama a função de geocoding reverso
    geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === 'OK' && results.length > 0) {
            const formattedAddress = results[0].formatted_address;
            const confirmedLocation = results[0].geometry.location; 
            window.alert(`Endereço encontrado: ${formattedAddress}`);
            // ✅ CHAMA O CALLBACK com os dados que queremos usar
            if (callback) {
                callback(formattedAddress, confirmedLocation);
            }
        } else {
            console.error('Reverse Geocoding falhou devido a: ' + status);
            window.alert("Não foi possível encontrar o endereço a partir das coordenadas do seu GPS.");
        }
    });
};

export const getDeviceLocation = ({geocodingLibrary, callback, onFailure}) => {
    // 1. Verifica se o navegador suporta a API de geolocalização
    if (navigator.geolocation) {
        window.alert("Por favor, confirme o uso da sua localização.");
        
        // Solicita a posição atual
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("Cheogu ate aqui")
                // Sucesso: Chama a função que inverte o Geocoding
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                const accuracy = position.coords.accuracy;
                // 10-50 metros: Boa (usando GPS ou Wi-Fi forte)
                // 100-500 metros: Média (usando dados de torres de celular)
                // > 1000 metros: (1 km)Ruim (usando apenas localização por IP ou baixa conectividade)

                console.log(`Coordenadas reais: Lat ${lat}, Lng ${lng}. Precisão: ${accuracy} metros`);

                if (accuracy >= 800) {
                    window.alert("Baixa conectividade, insira os dados manualmente...");
                    if (onFailure) { 
                        onFailure();
                    }
                    return;
                }

                reverseGeocode(lat, lng, geocodingLibrary, callback);
            },
            (error) => {
                // Erro: Usuário negou ou houve falha
                console.error("Erro na Geolocalização:", error);
                window.alert("Não foi possível obter a localização do dispositivo. Por favor, digite o endereço manualmente.");
            },
            {
                // Opções de alta precisão
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 0
            }
        );
    } else {
        window.alert("Seu navegador não suporta Geolocalização.");
    }
};