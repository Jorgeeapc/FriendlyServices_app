//Dependencias
import React, {useState, useEffect} from 'react'
import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import Geolocation from '@react-native-community/geolocation';
import {ActivityIndicator, View} from 'react-native'
//Contexto user
import userContext from './context/userContext'
//Contexto location
import locationContext from './context/locationContext';
//Iconos
import Icon from 'react-native-vector-icons/FontAwesome'
import IonIcon from 'react-native-vector-icons/Ionicons'
//Screens
import MapNavigator from './Navigator';
import { MapScreen } from './screens/MapScreen'
import { ProfileScreen } from './screens/ProfileScreen'

//Screens Names
const MapName = 'Mapa'
const ListName = 'Lista de servicios'
const ProfileName = 'Perfil'

const Tab = createBottomTabNavigator()

export  function  MainContainer(user) {

    useEffect(()=>{
        getLocation()
    }, [])

    //State location
    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0
    })
    //State de carga
    const [isLoading, setIsLoading] = useState(false)

    async function getLocation(){
        Geolocation.watchPosition(
          (pos) => {
            setLocation(pos.coords)
            // console.log(pos.coords)
            setIsLoading(false)
          },
          (error) => {console.log(error); Alert.alert('', 'La aplicación requiere tu ubicación'); getLocation()},
          { enableHighAccuracy: false,
            timeout: 20000,
            maximumAge: 3600000
           }
        );
        setIsLoading(false)
    }

    if(location.latitude==0){
        return(
            <View style={{flex:1, justifyContent:"center", alignItems: "center", backgroundColor:'ececec'}}>
                <ActivityIndicator style={{backgroundColor: '#ececec'}} size={'large'}/>
            </View>
        )
    }

    return (
            <userContext.Provider value={user.user}>
            <locationContext.Provider value={location}>
                <BottomTabBarHeightContext.Consumer>
                    {tabBarHeight => (
                        <NavigationContainer>
                            <Tab.Navigator
                                sceneContainerStyle={{backgroundColor:"#ececec" }}
                                initialRouteName={ListName}
                                screenOptions={({ route }) => ({
                                    headerShown: false,
                                    tabBarStyle: {
                                        height: 55,
                                        paddingHorizontal: 5,
                                        paddingTop: 0,
                                        backgroundColor: '#ececec',
                                        borderTopWidth: 0,
                                        position: 'absolute',
                                        shadowColor: 'rgba(42, 33, 33, 0.22)'
                                    },
                                    tabBarIcon: ({ focused, color, size}) =>{
                                        let iconName;
                                        let rn = route.name;
                                        
                                        if (rn === MapName) {
                                            iconName = focused ? 'map' : 'map-o'
                                            return <Icon name={iconName} color='#9d53c3' size={25}/>  
                                        } else if (rn === ListName) {
                                            iconName = focused ? 'md-list-circle-sharp' : 'md-list-circle-outline'
                                            return <IonIcon name={iconName} color='#9d53c3' size={30}/>  
                                        } else if (rn === ProfileName) {
                                            iconName = focused ? 'person' : 'person-outline'
                                            return <IonIcon name={iconName} color='#9d53c3' size={25}/>
                                        }
                                    },    
                                }
                                
                                )}
                                >
                                <Tab.Screen 
                                    name={ListName} 
                                    component={MapNavigator}
                                    initialParams={user}
                                    options={{
                                        tabBarLabelStyle: {
                                            fontSize: 15,
                                            fontWeight: "bold",
                                            color: '#9d53c3'
                                }}}/>
                                <Tab.Screen name={MapName} component={MapScreen} 
                                    options={{
                                        tabBarLabelStyle: {
                                            fontSize: 15,
                                            fontWeight: "bold",
                                            color: '#9d53c3'
                                        }
                                }}/>
                                <Tab.Screen name={ProfileName} component={ProfileScreen} 
                                    options={{
                                        tabBarLabelStyle: {
                                            fontSize: 15,
                                            fontWeight: "bold",
                                            color: '#9d53c3'
                                        }
                                }}/>
                            </Tab.Navigator>
                        </NavigationContainer>
                    )}
                </BottomTabBarHeightContext.Consumer>
            </locationContext.Provider>
            </userContext.Provider>
    )
}

export default MainContainer