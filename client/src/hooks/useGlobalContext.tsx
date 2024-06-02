import { useContext,createContext, FC, useState } from "react";
import { TChildrenProp } from "../type";

type AppContextType = {
    cardLength: number;
    setCardLength:(value: number | ((prevLength: number) => number)) => void;
}

const AppContext = createContext<AppContextType|undefined>(undefined);
const AppProvider : FC<TChildrenProp> = ({children})=>{
    const [cardLength , setCardLength] = useState(0)

    return <AppContext.Provider value={{cardLength, setCardLength}}>
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