import React, { createContext, useReducer, useContext, useEffect } from 'react';

const initialState = {
    loggedIn: false,
    user: {
        email: null,
        name: null,
        tok: null,
        isfull: []
    },
    filterOpts: {
        only_mine: false,
        by_user: "",
        verified: false,
        needs_id: false,
        date: {
            start: new Date(),
            end: new Date(),
            checked: false,
            unix_start: new Date().getTime()/1000,
            unix_end: new Date().getTime/1000,
        },
        by_location: false,
    }
}

const GlobalStateContext = createContext(initialState);


const globalStateReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOGGEDIN':
            return {
                ...state,
                loggedIn: action.payload
            }
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            }
        case 'SET_FILTER_OPTS':
            return {
                ...state,
                filterOpts: action.payload
            }
        default:
            return state;
    }
}

export const GlobalStateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(globalStateReducer, initialState);

    return <GlobalStateContext.Provider value={[state, dispatch]}>
        {children}
    </GlobalStateContext.Provider>

}

const useGlobalState = () => {
    const [state, dispatch] = useContext(GlobalStateContext);

    const setLoggedIn = (val) => dispatch({ type: 'SET_LOGGEDIN', payload: val })
    const setUser = (user) => dispatch({ type: 'SET_USER', payload: user })
    const setFilterOpts = (f) => dispatch({ type: 'SET_FILTER_OPTS', payload: f })

    return {
        setLoggedIn,
        setUser,
        setFilterOpts,
        loggedIn: state.loggedIn,
        user: state.user,
        filterOpts: state.filterOpts,
    }
}

export default useGlobalState;
