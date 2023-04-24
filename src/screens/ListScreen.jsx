//Dependencias
import React, {useEffect, useState} from 'react'
import {ScrollView, View, ActivityIndicator, TouchableOpacity, Text, Button} from 'react-native'
import {Card, Paragraph, TextInput, Title } from 'react-native-paper'
import axios from 'axios'
import Search from 'react-native-vector-icons/AntDesign'
import getDistance from 'geolib/es/getDistance';
//Contexto location
import useLocation from '../hooks/useLocation'
//Estilos
import { Styles } from './Styles'
//Componentes
import ServiceModal from '../components/serviceModal'


export const ListScreen = (props) => {

    //Url API para peticiones
    const baseURL='http://146.83.194.142:1153/API-FriendlyServices/public/api/'
    //Url API para imagenes
    const imageURL='http://127.0.0.1:8000/'
    //State para recibir informacion desde la API
    const [services, setServices] = useState([])
    //State para mostrar o esconder modal de servicios
    const [openModal, setOpenModal] = useState(false)
    //State para cargar info del servicio seleccionado al modal
    const [service, setService] = useState(null)
    //State para verificar carga de datos
    const [isLoading, setIsLoading] = useState(false)
    //State para obtener categorias
    const [categories, setCategories] = useState([])
    //State seleccionar filtro de busqueda
    const [filter, setFilter] = useState ()
    //State para utilizar busqueda por nombre
    const [search, setSearch] = useState(false)
    //State para busqueda por nombre
    const [text, setText] = useState()
    //Datos de localizacion
    const location = useLocation() 
    //State distancia con el servicio
    const [distance, setDistance] = useState()
    //State service location
    const [serviceLocation, setServiceLocation] = useState({
        latitude: 0,
        longitude:0
    })

    //Validacion de listado de servicios
    let services_lenght = services.length    
    const [exist, setExist] = useState(true)
    useEffect(()=>{
        if (services_lenght==0) {
            setExist(false)
        }
        if(services_lenght>0){
            setExist(true)
        }
        console.log(exist, services_lenght)
    }, [services_lenght])

    useEffect(()=>{getByFilter()}, [filter])
    useEffect(()=>{getServices(), getCategories()}, [])
    useEffect(()=>{getByName()}, [text])
    useEffect(()=>{
        setDistance(getDistance(location, serviceLocation))
        // console.log(distance)
    }, [serviceLocation])

    const showMap = (item) => {
        props.navigation.push('Mapa', item)
    }

    const showDetails = (item) => {
        setService(item)
        // console.log(distance)
        props.navigation.push('Detalle', {item})
    }

    const getCategories = async()=>{
        await axios.get(baseURL+'categories')
        .then(response=> {
            setCategories(response.data)
            // console.log(response.data)
        })
        .catch(error => console.log(error))
    }

    const getByName = async()=>{
        // setIsLoading(true)
        await axios.get(baseURL+'getbyname/'+text)
        .then(response=>{
            setServices(response.data)
            // console.log(services)
        })
        .catch(error => console.log(error))
        // setIsLoading(false)
    }

    const getByFilter = async()=>{
        setIsLoading(true)
        await axios.get(baseURL+'getbyid/'+filter)
        .then(response => {
            setServices(response.data)
            // console.log(services)
        })
        .catch(error => console.log(error))
        setIsLoading(false)
    }

    const getServices = async()=>{
        setIsLoading(true)
        await axios.get(baseURL+'services')
        .then(response => {
            setServices(response.data)
            // console.log(response.data)
            // setIsLoading(false)
        })
        .catch(error => console.log(error))
        setIsLoading(false)
    }

    return(
        <View>
            <View style={Styles.searchContainer} >
                    <TouchableOpacity  onPress={search ? ()=>setSearch(false): ()=>setSearch(true)} style={{alignSelf:'center', paddingLeft: 8}}>
                        <Search name={!search ? 'search1' : 'filter'} size={25}/> 
                    </TouchableOpacity>
                {search ? 
                <TextInput style={{width: 300, backgroundColor: 'white', alignSelf: 'center', borderRadius: 8, height: 23}} 
                           placeholder='Nombre del servicio'
                           onChangeText={(text)=>setText(text)}
                />
                : 
                <ScrollView style={Styles.searchSubContainer} horizontal={true}>
                    <TouchableOpacity onPress={ ()=>{getServices()} } style={Styles.filterButton} >
                        <Text style={Styles.filterText}>Todo</Text>
                    </TouchableOpacity>
                    {
                    categories.map((item, key)=>(
                        <TouchableOpacity onPress={ ()=>{setFilter(item.id_category)} } style={Styles.filterButton} key={key}>
                            <Text numberOfLines={1} style={Styles.filterText}>{item.name_category}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                }
            </View>
            {isLoading ? 
            <View style={{flex:1, justifyContent:"flex-end", alignItems: "center", backgroundColor: 'black'}}>
                <ActivityIndicator style={{backgroundColor: '#bbe4e9'}} size={'large'}/>
            </View>
            :
            exist ?
            <ScrollView style={Styles.scrollList}>   
                {services.map((item, key)=>(
                    <View key={key} style={Styles.cardContainer}>
                        <Card  
                            onPress={()=>{setServiceLocation({latitude:item.latitude, longitude: item.longitude}); showDetails(item)}}
                            // onPress={ ()=>{setService(item); setServiceLocation({latitude:item.latitude, longitude: item.longitude}); setOpenModal(true);}}  
                        >
                            <Card.Cover
                                source={{uri: 'http://146.83.194.142:1153/API-FriendlyServices/public/'+item.url_image}}
                                resizeMode={'stretch'}/>
                            <Card.Content style={{backgroundColor: '#f7e185'}}>
                                <Title>{item.name_service}</Title>
                                <Paragraph>{item.name_business}</Paragraph>
                                <TouchableOpacity onPress={()=>showMap(item)} style={Styles.filterButton}>
                                    <Text style={{alignSelf:'center'}}>Ver ubicación</Text>
                                </TouchableOpacity>
                            </Card.Content>
                        </Card>
                    </View>
                ))}
            </ScrollView>
            :
            <View style={{alignItems:'center', justifyContent:'center'}}>
                <Text>No existen servicios con esas características</Text>
            </View>
            }
    </View>
    )
}

export default ListScreen