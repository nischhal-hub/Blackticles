import React, { useState } from 'react'

const useModal = ():[boolean, ()=>void] => { 
    const [isShowing, setIsShowing] = useState(false)
    const toggle = ()=>{
        setIsShowing(v=>!v)
    }
    return [isShowing, toggle]
}

export default useModal