import { useContext,createContext, FC, useState } from "react";
import { TChildrenProp } from "../type";

type AppContextType = {
    cardLength: number;
    setCardLength:(value: number | ((prevLength: number) => number)) => void;
    deleteId: string;
    setDeleteId:any;
    toasterStat:TToaster;
    setToasterStat:any;
    description:string;
    setDescription:any;
}
type TToaster = {
    show:boolean;
    type:string;
    msg:string;
    icon:JSX.Element|null;
}

const AppContext = createContext<AppContextType|undefined>(undefined);
const AppProvider : FC<TChildrenProp> = ({children})=>{
    const [cardLength , setCardLength] = useState(0)
    const [deleteId, setDeleteId] = useState("")
    const [description, setDescription] = useState("")
    const [toasterStat, setToasterStat] = useState<TToaster>({show:false,type:"",msg:"",icon:null})

    return <AppContext.Provider value={{cardLength, setCardLength,setDeleteId,deleteId, toasterStat,setToasterStat,description,setDescription}}>
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