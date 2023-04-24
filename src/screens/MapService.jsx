//Dependencias
import React from 'react'
import {Text, SafeAreaView} from 'react-native'
import MapView, { Callout, Marker } from 'react-native-maps'
import useLocation from '../hooks/useLocation'

//Estilos
import { Styles } from './Styles'

export const MapService = (props) => {

  // console.log(props.route.params)
  const location = useLocation()
  const service = props.route.params

  return (
    <SafeAreaView style={{marginBottom:45 , flex:1,  backgroundColor: 'rgba(52, 52, 52, 0)', justifyContent:'center'}}>
      <MapView 
        style={Styles.flex}
        initialRegion={{
          latitude: Number(service.latitude),
          longitude: Number(service.longitude),
          latitudeDelta: 0.09,
          longitudeDelta: 0.04
        }}
        showsUserLocation={true}
      >
          <Marker
            coordinate={{
              latitude:Number(props.route.params.latitude), 
              longitude: Number(props.route.params.longitude)
              }}
            >
            <Callout>
                <Text>{props.route.params.name_service}</Text>
                <Text>{props.route.params.name_business}</Text>
            </Callout>
          </Marker>           
      </MapView>
    </SafeAreaView>   
  ) 
}

export default MapService
