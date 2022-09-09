import { CasesContext } from "../context/CaseContext";
import { useContext } from "react";

export const useCasesContext = () => {
    
    const context = useContext(CasesContext)

    if (!context) {
        throw Error('useCasesContext must be used inside a CasesContextProvider')
    }

    return context
}