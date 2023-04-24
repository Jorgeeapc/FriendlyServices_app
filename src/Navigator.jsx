import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {MapService} from "./screens/MapService"
import { ListScreen } from "./screens/ListScreen";
import CommentScreen from "./screens/CommentScreen";
import RatinScreen from "./screens/RatinScreen";

const Stack = createStackNavigator()

const MapNavigator = (props) =>{
    return(
        <Stack.Navigator>
             <Stack.Screen
                name="Servicios"
                component={ListScreen}
            />
            <Stack.Screen
                name="Mapa"
                component={MapService}
            />
            <Stack.Screen
                name="Detalle"
                component={CommentScreen}
            />
            <Stack.Screen
                name="Evaluación"
                component={RatinScreen}
            />
        </Stack.Navigator>
    )
} 

export default MapNavigator