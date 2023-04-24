//Dependencias
import React, {useState, useEffect} from 'react'
import {Modal, View, Image, Text, TouchableOpacity, ActivityIndicator, ScrollView, Alert} from 'react-native'
import { Rating } from 'react-native-ratings';
import axios from 'axios';
import getDistance from 'geolib/es/getDistance';
//Context
import useUser from '../hooks/useUser'
import useLocation from '../hooks/useLocation';
//Estilos
import { Styles } from './Styles'

const CommentScreen = (props) =>{

    // console.log(props.route.params)
    const baseURL='http://146.83.194.142:1153/API-FriendlyServices/public/api/'
    const [isLoading, setIsLoading] = useState(false)
    //Use user Context
    const user = useUser()
    //Use location Context
    const location = useLocation()
    const [comments, setComments] = useState([])
    const [stay, setStay] = useState(null)
    //State disabled
    const [able, setAble] = useState(true)
    //Ubicacion del servicio seleccionado
    const service_location = {
        latitude: props.route.params.item.latitude,
        longitude: props.route.params.item.longitude
    }
    //Distancia entre el servicio y la usuaria
    const distance = getDistance(location,service_location)

    const showRating = (id) => {
        props.navigation.push('Evaluación', id)
    }

    
    // useEffect para validar evaluacion segun ubicacion
    useEffect(()=>{
        // console.log(distance)
        if (Number(distance)>Number(200)) {
            setAble(false)
            // console.log(able)
            // console.log('estas lejos')
        }
        if(Number(distance)<Number(200)){
            setAble(true)
            // console.log(able)
            // console.log('puedes evaluar')
        }
        // console.log(props.route.params.distance)
    })

    //useEffect para obenter comentarios del servicio
    useEffect(()=>{
        getComments()
    }, [])

    const getComments = async()=>{
        setIsLoading(true)
        await axios.get(baseURL+'comments/'+props.route.params.item.id_service)
        .then(response => {
            setComments(response.data)
            // console.log(comments)
            // setIsLoading(false)
        })
        .catch(error => console.log(error))
        setIsLoading(false)
    }

    if (props.route.params.item==null) {
        return(
            <View style={{flex:1, justifyContent:"center", alignItems: "center"}}>
                <ActivityIndicator size={'large'}/>
            </View>
        )
    }

    return(
        <View style={{backgroundColor:'#f7e185', height: '100%'}}>
            {/* <DialogModal service={props.route.params.item.id_service} animationType={''} visible={stay} onClose={()=>{setStay(false)}}/> */}
            <View >
                <View >
                    <Image source={{uri: 'http://146.83.194.142:1153/API-FriendlyServices/public/'+props.route.params.item.url_image}} style={Styles.serviceImage}/>
                        <View>
                            <View style={{backgroundColor: '#f7e185', marginVertical:8}}>
                                <Text style={Styles.modalTitles}>{props.route.params.item.name_service}</Text>
                                <Text style={Styles.modalTitles}>{props.route.params.item.name_business}</Text>
                                <Text style={{alignSelf:'center'}}>{props.route.params.item.adress_service}</Text>
                                <Text style={{alignSelf:'center'}}>Contacto: {props.route.params.item.phone_business}</Text>
                                <Rating  type='custom' tintColor='#f7e185' startingValue={props.route.params.item.rate} readonly={true} fractions={2} imageSize={28}/>
                            </View>
                            <ScrollView style={{backgroundColor:'#f7e185', height:180, width:'85%', alignSelf: 'center', shadowRadius:10, elevation:5}}>
                                {isLoading ? <ActivityIndicator size={'large'}/> : 
                                comments.map((item, key) =>(
                                    <View key={key} style={{backgroundColor:'#f7e185' ,borderBottomWidth: 1, borderBottomColor: '#f7e185', width:'80%'}}>
                                        <Text style={Styles.commentName}>{item.name_user}<Text>{' '+item.last_name_user}</Text></Text>
                                        <Text>{item.comment}</Text>
                                    </View>
                                ))
                                }
                            </ScrollView>
                            <View style={{backgroundColor:'#f7e185', alignItems:'center', height:80 ,justifyContent:'flex-start'}}>
                                <TouchableOpacity 
                                    onPress={()=>{{able? showRating(props.route.params.item.id_service):Alert.alert('Debes utilizar el servicio', 'Para evaluar, tu ubicación debe coincidir con la del servicio')}}} style={Styles.locationButton}
                                    // onPress={()=>{{able? setStay(true):Alert.alert('Debes utilizar el servicio', 'Para evaluar, tu ubicación debe coincidir con la del servicio')}}} style={Styles.locationButton}
                                >
                                    <Text style={Styles.buttonText}>Evaluar</Text>
                                </TouchableOpacity>
                            </View> 
                        </View>
                </View>    
            </View>
        </View>
    )
}
export default CommentScreen

