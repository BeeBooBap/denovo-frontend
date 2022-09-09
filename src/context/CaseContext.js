import { createContext, useReducer } from 'react'

export const CasesContext = createContext()

export const casesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CASES':
            return {
                cases: action.payload
            }
        case 'CREATE_MATTER':
            return {
                cases: [action.payload, ...state.cases]
            }
        case 'DELETE_MATTER':
            return {
                cases: state.cases.filter((c) => c._id !== action.payload._id)
            }
        case 'UPDATE_MATTER':
            return {
                cases: action.payload
            }
        default: 
            return state
    }
}

// to wrap the rest of the application with the context
export const CasesContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(casesReducer, {
        cases: null
    })
    
    return (
        <CasesContext.Provider value={{...state, dispatch}}>
            { children }
        </CasesContext.Provider>
    )
}