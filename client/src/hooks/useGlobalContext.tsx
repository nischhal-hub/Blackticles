import { useContext,createContext, FC } from "react";
import { TChildrenProp } from "../type";

type AppContextType = {
    hi:string;
}

const AppContext = createContext<AppContextType|undefined>(undefined);
const AppProvider : FC<TChildrenProp> = ({children})=>{
    let hi = "1";

    return <AppContext.Provider value={{hi}}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = ()=>{
    const context = useContext(AppContext)
    if(!context){
        throw new Error("UseGlobalcontext must be used within app provider.")
    }
    return context;
}

export {AppContext, AppProvider}