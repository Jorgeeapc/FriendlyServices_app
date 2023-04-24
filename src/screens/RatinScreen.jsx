//Dependencias
import React, {useState, useEffect} from "react";
import {Modal, Text, View, Alert, TouchableOpacity, ActivityIndicator} from 'react-native'
import DelayInput from "react-native-debounce-input";
import { Rating } from 'react-native-ratings';
import axios from "axios";
//Contexto user
import useUser from '../hooks/useUser'
//Estilos
import { Styles } from "../screens/Styles";

const RatinScreen = (props) => {
    // console.log(props.route.params)
    const baseURL='http://146.83.194.142:1153/API-FriendlyServices/public/api/'
    //Obtencion datos usuario a traves de useContext
    const user = useUser()
    let u = {}
    Object.assign(u, user)
    //Estado de carga de criterios
    const [isLoading, setIsLoading] = useState()
    //Estado de carga de input comentario
    const [loading, setLoading] = useState(false)
    //Manejo de informacion de input comentario
    const [text, setText] = useState('')
    //Obtencion de criterios que afectan al servicio
    const [criteria, setCriteria] = useState([]) 
    //Estado para enviar informacion al backend
    const [comment, setComment] = useState([{
        id_user: u[0].id_user,
        id_service: props.route.params,
        comment: '',
        criterion_rate: [{
            criterion_id: null,
            criterion_rate: null
        }]
    }]) 
    //Manejo de input evaluacion
    const [star, setStar] = useState([{
        id_criterion: null,
        criterion_rate: null
    }]) 

    useEffect(()=> {
        getCriteria()
    }, [])

    useEffect(()=> {
        setLoading(true)
        setComment({
            id_user: u[0].id_user,
            id_service: props.route.params,
            comment: text,
            criterion_rate: star
        })
        console.log(comment)
        setLoading(false)
    }, [text])

    function setRating(rating, id){
        let count = 0
        star.map((item)=>{
            if (rating==item.id_criterion) {
                count = count+1
                item.criterion_rate=id
            }
        })
        if (count==0) {
            star.push({ 
                id_criterion:rating,
                criterion_rate: id
            })
        }
        
        // console.log(star)
    }

    const getCriteria = async()=>{
        setIsLoading(true)
        await axios.get(baseURL+'criteriaservice/'+props.route.params)
        .then(response => {
            setCriteria(response.data)
            // console.log(response.data)
            // console.log(props.route.params)
        })
        .catch(error => console.log(error)) 
        setIsLoading(false) 
    }

    const commenting = async()=>{
        if (comment.comment!='') {
            await axios.post(baseURL+'commenting',(comment))
            .then(response => {
                Alert.alert("Gracias","se han ingresado tus comentarios y evalución")
                console.log(response)
                // console.log(comment)
                setText('')
                props.navigation.popToTop()
            })
            .catch(error => console.log(error)) 
        }
        if (comment.comment === '') {
            Alert.alert('Debes ingresar un comentario')
        }
        // console.log(comment)
    }

    return(
        <View style={{backgroundColor: '#cb9bba', height:'100%'}}>
            <View >
                <View >
                    <Text style={Styles.stayText}>Comparte tu experiencia</Text>
                    <Text style={{fontStyle:"italic",  alignSelf: "center"}}>Al registrar una comentario estás asegurando haber utilizado el servicio</Text>
                    <Text style={{alignSelf:"center",fontWeight:"bold"}}>Evalúa el servico (Un criterio en blanco se considera NO evaluado)</Text>
                    {isLoading ? <ActivityIndicator size={'large'}/> : 
                                    criteria.map((item, key) =>(
                                    <View key={item.id_criterion} style={{alignItems:"center", justifyContent:"center"}}>
                                        <Text style={Styles.commentName}>{item.name_criterion}</Text>
                                        <Rating onFinishRating={(rating)=>setRating(item.id_criterion, rating)} type='custom' tintColor='#cb9bba'startingValue={0} imageSize={28}/>
                                    </View>
                                ))
                    }
                </View>
                <DelayInput
                        value={text}
                        delayTimeout={500}
                        onChangeText={(e)=>{setText(e)}}
                        placeholder="Escribe un comentario..."
                        style={{width: '80%', backgroundColor: 'white', marginVertical: 5, borderRadius: 5, alignSelf:"center", color:'#000000'}}
                    />
                    <View >
                        <TouchableOpacity disabled={loading ? true : false} onPress={()=>commenting()} style={Styles.locationButton}>
                            <Text style={{color: 'white'}}>Comentar</Text>
                        </TouchableOpacity>
                    </View>
            </View>
        </View>
    )
}

export default RatinScreen