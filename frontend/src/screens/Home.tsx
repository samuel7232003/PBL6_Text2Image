import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";

export default function Home(){
    const [isStart, setIsStart] = useState(false);

    return (
        <div>
            {/* <Header isStart={isStart}/> */}
            <div>
                <Outlet context={{setIsStart}}/>
            </div>
        </div>
    )
}