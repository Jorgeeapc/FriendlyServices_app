//Dependencias
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Alert, Button} from "react-native";
import axios from "axios";
//useContext
import useUser from "../hooks/useUser";
//Estilos
import { Styles } from "./Styles";
import  {MainContainer}  from "../MainContainer";

export const LoginScreen = () => {

    const baseURL='http://146.83.194.142:1153/API-FriendlyServices/public/api/login'
    const [isLoading, setIsLoading] = useState(false)
    const [email_user, setEmail] = useState('')
    const [password, setPass] = useState('')
    const [data, setData]= useState({
        email_user: '',
        password: ''
    })
    const [auth, setAuth] = useState({})

    useEffect(()=>{
        setData({
            email_user: email_user,
            password: password
        })
    }, [email_user, password])

    const login = async()=>{
        setIsLoading(true)
        await axios.post(baseURL, (data))
        .then(response => {
            if (response.data.status==500) {
                Alert.alert("No se ha iniciado la sesión", "Los datos ingresados no son correctos")
            }
            if (response.data.status==200) {
                setAuth(response.data)
                // console.log(response.data.data)
            }
            // console.log(Object.keys(auth).length)
            setIsLoading(false)
        })
        .catch(error =>{ console.log(error), Alert.alert("Ha ocurrido un error", 'Inténtalo otra vez'), setIsLoading(false)});
    }

    if (isLoading) {
        return(
            <View style={{flex:1, justifyContent:"center", alignItems: "center"}}>
                {/* <ActivityIndicator size={'large'}/> */}
                <Text>cargando</Text>
            </View>
        )
    }
   
    if (Object.keys(auth).length == 0) {
        return(
            <View style={{flex: 1, backgroundColor:"#ececec"}}>
                <View style={{
                    flex:1 ,
                    width: '100%',
                    height:100,
                    justifyContent: "center",
                    alignItems:"center"
                }}>
                    <Text style={{
                        fontSize: 30,
                        fontWeight: '500'
                    }}>Login</Text>
                </View>
                <View style={{
                    flex: 2,
                    width: '100%',
                    marginVertical: 50,
                    alignItems: "center"
                }}>
                    <TextInput
                        placeholder="Correo"
                        onChangeText={(e)=> setEmail(e)}
                        style={{width: 300, backgroundColor: 'white', marginVertical: 5, borderRadius: 5, color:'#000000'}}
                    />
                    <TextInput
                        secureTextEntry={true}
                        placeholder="Contraseña"
                        onChangeText={(e) => setPass(e)}
                        style={{width: 300, backgroundColor: 'white', marginVertical: 5, borderRadius: 5, color:'#000000'}}
                    />
                    <Button
                        title="Ingresar"
                        color="#f83e4b"
                        onPress={() => login()}
                />
                </View>
            </View>
        )
    }

    return(
        <View style={{marginTop: 2 , flex:1,  backgroundColor: 'rgba(52, 52, 52, 0)', justifyContent:'center'}}>
            <MainContainer user={auth.data}/>
        </View>
    )   
}