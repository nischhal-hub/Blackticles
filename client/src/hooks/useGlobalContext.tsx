import { useContext,createContext, FC, useState } from "react";
import { TChildrenProp } from "../type";

type AppContextType = {
    cardLength: number;
    setCardLength:(value: number | ((prevLength: number) => number)) => void;
    deleteId: number;
    setDeleteId:(value: number | ((prevLength: number) => number)) => void;
    isDeleted:boolean;
    setIsDeleted:(value:boolean | ((prevValue: boolean)=>boolean))=>void;
}

const AppContext = createContext<AppContextType|undefined>(undefined);
const AppProvider : FC<TChildrenProp> = ({children})=>{
    const [cardLength , setCardLength] = useState(0)
    const [deleteId, setDeleteId] = useState(0)
    const [isDeleted, setIsDeleted] = useState(false)

    return <AppContext.Provider value={{cardLength, setCardLength,setDeleteId,deleteId, isDeleted,setIsDeleted}}>
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