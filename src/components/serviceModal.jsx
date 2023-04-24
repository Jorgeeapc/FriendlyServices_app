import React, {useState, useEffect} from 'react'
import {Modal, View, Image, Text, TouchableOpacity, ActivityIndicator, ScrollView, Alert} from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { Rating } from 'react-native-ratings';
import axios from 'axios';
//Modal de registro de visita y comentario
import DialogModal from './dialogModal';
//Context
import useUser from '../hooks/useUser'
import useLocation from '../hooks/useLocation';
//Estilos
import { Styles } from '../screens/Styles'

export default function ServiceModal ({service, visible, onClose, distance, onCloseData}){


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
    
    useEffect(()=>{
        if (Number(distance)>Number(200)) {
            setAble(false)
            console.log(able)
            console.log('estas lejos')
        }
        if(Number(distance)<Number(200)){
            setAble(true)
            console.log(able)
            console.log('puedes evaluar')
        }
        console.log(distance)
    })

    useEffect(()=>{
        getComments()
    }, [visible])

    const getComments = async()=>{
        setIsLoading(true)
        //
        if (visible) {
            await axios.get(baseURL+'comments/'+service.id_service)
            .then(response => {
                setComments(response.data)
                // console.log(comments)
                // setIsLoading(false)
            })
            .catch(error => console.log(error))
        }  
        setIsLoading(false)
    }

    if (service==null) {
        return(
            <View style={{flex:1, justifyContent:"center", alignItems: "center"}}>
                <ActivityIndicator size={'large'}/>
            </View>
        )
    }

    return(
        <Modal
            visible= {visible}
            animationType = {'slide'}
        >
            <DialogModal service={service.id_service} animationType={''} visible={stay} onClose={()=>{setStay(false)}}/>
            <View style={Styles.modalContainer}>
                
                <View style={Styles.scrollContainer}>
                    <IonIcon 
                        name='close'
                        size={24}
                        style={Styles.closeIcon}
                        onPress={onClose}    
                    />
                    <Image source={{uri: 'http://146.83.194.142:1153/API-FriendlyServices/public/'+service.url_image}} style={Styles.serviceImage}/>
                        <View style={Styles.serviceSubContainer}>
                            <View>
                                <Text style={Styles.modalTitles}>{service.name_service}</Text>
                                <Text style={Styles.modalTitles}>{service.name_business}</Text>
                                <Text style={{alignSelf:'center'}}>{service.adress_service}</Text>
                                <Rating  type='custom' tintColor='#f7e185' startingValue={service.rate} readonly={true} fractions={2} imageSize={28}/>
                            </View>
                            <ScrollView style={Styles.commentContainer}>
                                {isLoading ? <ActivityIndicator size={'large'}/> : 
                                comments.map((item, key) =>(
                                    <View key={key} style={{backgroundColor:'#f7e185' ,borderBottomWidth: 1, borderBottomColor: '#f7e185'}}>
                                        <Text style={Styles.commentName}>{item.name_user}<Text>{' '+item.last_name_user}</Text></Text>
                                        <Text>{item.comment}</Text>
                                    </View>
                                ))
                                }
                            </ScrollView>
                            <View style={Styles.modalButtonContainer}>
                                <TouchableOpacity onPress={()=>{{able? setStay(true):Alert.alert('Debes utilizar el servicio', 'Para evaluar, tu ubicación debe coincidir con la del servicio')}}} style={Styles.locationButton}>
                                    <Text style={Styles.buttonText}>Evaluar</Text>
                                </TouchableOpacity>
                            </View> 
                        </View>
                </View>    
            </View>
        </Modal>
    )
}

