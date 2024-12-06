import { useEffect } from "react";
import { useOutletContext } from "react-router-dom"
import './mainpage.css'

export default function MainPage(){
    const {setIsStart}:any = useOutletContext();

    useEffect(() => {
        setIsStart(true);
        // eslint-disable-next-line
    }, [])

    return(
        <div className="mainpage">
            <div className="inner"></div>
        </div>
    )
}