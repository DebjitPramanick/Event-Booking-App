import {createContext} from 'react'

export const AppContext = createContext({
    token: null,
    userId: null,
    login: (userId, token, tokenExp) => {},
    logout: () => {}
})