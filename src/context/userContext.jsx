import { createNavigationContainerRef } from '@react-navigation/native'
import {createContext} from 'react'

const userContext = createContext({
    id_user: null,
    created_at: null,
    updated_at: null,
    name_user: null,
    last_name_user: null,
    email: null,
    phone_user: null,
    last_log: null,
    date_joined: null
})

export default userContext