import { CardStyleInterpolators } from '@react-navigation/stack'
import {StyleSheet} from 'react-native'

export const Styles = StyleSheet.create({
   
  //Mapa
 
  //Containers
    flex: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
    },

    // MODAL DE SERVICIO

    modalContainer: {
      flex: 1,
      backgroundColor: '#cb9bba',
      justifyContent: 'center',
      alignItems: 'center'
    },

    scrollContainer: {
      width: '85%',
      height:'80%',
      backgroundColor:'#f7e185',
      borderRadius: 10,
      justifyContent:'flex-start'
    },

    scrollList: {
      marginBottom: 100,
      backgroundColor: '#ececec'
    },

    modalButtonContainer:{
      height: 50,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 5,
      backgroundColor:'#f7e185',
    },

    //CONTAINER BUSQUEDA Y FILTRO
    searchContainer:{
      backgroundColor:'#ececec',
      justifyContent: 'center',
      height: 40,
      flexDirection: 'row'
    },

    searchSubContainer:{
      marginHorizontal: 10,
      backgroundColor:'#ececec',
      marginHorizontal:15,
      alignContent: 'center'
    },

    //MODAL REGISTRAR VISITA Y COMENTARIO

    dialogContainer:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ececec'
    },

    commentContainer:{
      height: 600,
      width:300,
      backgroundColor: '#f7e185',
      borderRadius: 5,
      paddingHorizontal: 5,
      alignSelf:'center'
    },

    //PERFIL
    perfilContainer: {
      padding: 20,
      height: 300,
      alignItems: 'center',
      backgroundColor: '#ececec'
    },

    perfilHeader: {
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ececec'
    },

    profileOptions: {
      backgroundColor: '#ececec',
      height: "100%",
      alignItems: 'flex-start',
      justifyContent: 'flex-start'
      },

    //CARD SERVICIOS
    cardContainer: {
      paddingHorizontal: 15,
      paddingVertical: 7,
    },

    serviceSubContainer: {
      paddingHorizontal: 6,
      flex:1,
      backgroundColor: '#f7e185',
      borderRadius: 5
    },


    //Icons
      closeIcon:{
        alignSelf: "flex-end"
      },

    //Textos
      headersText: {
        fontSize: 30,
        color: 'white',
        fontWeight: '500'
      },

      stayText: {
        fontSize: 25,
        alignSelf: 'center'
      },

      profileText: {
        fontSize: 25
      },

      buttonText: {
        color: 'white'
      },

      modalTitles:{
        fontSize: 20,
        alignSelf: 'center'
      },

      commentName: {
        fontWeight: 'bold'
      },

      filterText:{
        color: 'black',
        alignSelf: 'center',
      },

    //Imagenes
      image: {
          width: 50,
          height: 50
      },

      profileImage: {
        borderRadius: 80,
        width: 120,
        height: 120,
      },

      serviceImage: {
        width: '100%',
        height: 150,

      },

    //Botones
      locationButton: {
        height: 30,
        width: 100,
        backgroundColor: '#f83e4b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 3,
        alignSelf:'center'
      },

      stayButton: {
        height:30,
        width:100,
        backgroundColor: '#f83e4b'
      },

      filterButton: {
        borderRadius: 8,
        backgroundColor: '#cb9bba',
        marginHorizontal:5,
        height: 25,
        alignSelf: 'center',
        width: 100,
        justifyContent:'center',
        alignContent: 'center'
      }
})