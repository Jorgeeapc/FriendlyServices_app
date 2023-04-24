//Dependencias
import React, {useEffect, useState} from 'react'
import {SafeAreaView, Text, View, Image, ScrollView} from 'react-native'
import { Styles } from './Styles'
import axios from 'axios'
//Context
import useUser from '../hooks/useUser'

export const ProfileScreen = () =>{

    const user = useUser()
    console.log(user)
    return (
        <SafeAreaView>
            
            <View style={Styles.perfilContainer}>
                <Image  
                    source={{uri: 'http://146.83.194.142:1153/API-FriendlyServices/public/images/usuaria.jpg'}}
                    resizeMode='stretch'
                    style={Styles.profileImage}
                />
                <Text style={Styles.profileText}>{user[0].name_user}{' '+user[0].last_name_user}</Text>
                <Text style={{fontSize: 20}}>{user[0].email_user}</Text>                
            </View>
            <View style={Styles.profileOptions}>
                {/* Aqui se pueden agregar opciones en el apartado "Perfil" */}
                
            </View>
            
        </SafeAreaView>
    )
}