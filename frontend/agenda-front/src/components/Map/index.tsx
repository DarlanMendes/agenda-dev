
import { GoogleMap, Marker, LoadScript, StandaloneSearchBox } from '@react-google-maps/api';
import React from 'react';
import { useState } from 'react';
import styles from './styles.module.css'


interface Props {
    lat: number,
    lng: number,
    setLat:(arg1:number)=>void
    setLng:(arg1:number)=>void
    edit:boolean
    endereco:string
    setEndereco:(arg1:string)=>void
}

export default function SimpleMap(props: Props) {
    

    const [map, setMap] = useState<google.maps.Map>()
    const [searchBox, setSearchBox] = React.useState<google.maps.places.SearchBox>( )
    const onMapLoad = (ref:google.maps.Map)=>{
        setMap(ref)
    }
    const onLoad = (ref:google.maps.places.SearchBox)=>{
        console.log("map",map)
        setSearchBox(ref)
    }
    const onPlacesChanged=()=>{
        const places = searchBox?.getPlaces()
        const place= places![0]
        
            props.setLat(place?.geometry?.location?.lat() as number)
            props.setLng(place?.geometry?.location?.lng()as number)
       
        map?.panTo({lat:props.lat, lng:props.lng})
        props.setEndereco(place.formatted_address as string)
    }
   
    return (
        <div style={{ gridColumn: '1/ span 2', flex: '1', width: '100%', marginBottom: '40px' }}>
            <LoadScript
                id="script-loader"
                googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string}
                libraries={['places']}
                >
                    <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
                        <input type='text' className={styles.inputBusca} disabled={!props.edit} placeholder={props.endereco} />
                    </StandaloneSearchBox>
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '300px', gridColumn: '1 / span 2' }}
                    onLoad={onMapLoad}
                    center={{
                        lat: props.lat,
                        lng: props.lng
                    }}
                    zoom={14}
                >
                    <Marker
                        position={{
                            lat: props.lat,
                            lng: props.lng
                        }}
                        options={{
                            label: {
                                text: "Você está aqui",
                                className:`${styles.marker}`
                            }
                        }}
                    />
                </GoogleMap>
            </LoadScript>
        </div>
    )
}

