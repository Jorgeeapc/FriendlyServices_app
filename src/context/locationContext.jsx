import { createNavigationContainerRef } from '@react-navigation/native'
import {createContext} from 'react'

const locationContext = createContext({
    latitude: null,
    longitude: null
})

export default locationContext