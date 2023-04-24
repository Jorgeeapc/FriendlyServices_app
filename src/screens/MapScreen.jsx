//Dependencias
import React, {useEffect, useState} from 'react'
import {Text, SafeAreaView, View, Alert, ActivityIndicator} from 'react-native'
import MapView, { Callout } from 'react-native-maps'
import { Marker } from 'react-native-maps'
import axios from 'axios'
import Geolocation from '@react-native-community/geolocation';
//hook de localizacion
import useLocation from '../hooks/useLocation'
//Estilos
import { Styles } from './Styles'

export const MapScreen = () => {

  const baseURL='http://146.83.194.142:1153/API-FriendlyServices/public/api/'
  const [services, setServices] = useState([])
  // const [location, setLocation]= useState({
  //   longitude: 0,
  //   latitude: 0
  // });
  const location = useLocation()
  const [origin, setOrigin] = useState({
    latitude: -36.839187, 
    longitude: -73.002380
  })
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(()=>{
    getServices()
    // getLocation()
    // console.log(location)
  }, [])

  const getServices = async()=>{
    await axios.get(baseURL+'services')
    .then(response => {
        setServices(response.data)
    })
    .catch(error => console.log(error));
  };

  

  // async function getLocation(){
  //   Geolocation.getCurrentPosition(
  //     (pos) => {
  //       setLocation(pos.coords)
  //       setIsLoading(false)
  //     },
  //     (error) => {console.log(error); Alert.alert('', 'La aplicación requiere tu ubicación'); getLocation()},
  //     { enableHighAccuracy: false,
  //       timeout: 20000,
  //       maximumAge: 3600000
  //      }
  //   );
  //   setIsLoading(false)
  // }


  // if (isLoading) {
  //   return(
  //     <View style={{flex:1, justifyContent:"center", alignItems: "center"}}>
  //         <ActivityIndicator size={'large'}/>
  //     </View>
  // )
  // }

  return (
    <SafeAreaView style={{marginBottom:45 , flex:1,  backgroundColor: 'rgba(52, 52, 52, 0)', justifyContent:'center'}}>
      <MapView 
        style={Styles.flex}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04
        }}
        showsUserLocation={true}
      >
        {services.map((item, key)=>
          <Marker
            key={key}
            coordinate={{
              latitude:Number(item.latitude), 
              longitude: Number(item.longitude)
              }}
            >
            <Callout>
                <Text>{item.name_service}</Text>
                <Text>{item.name_business}</Text>
            </Callout>
          </Marker>
        )}             
      </MapView>
    </SafeAreaView>   
  ) 
}
