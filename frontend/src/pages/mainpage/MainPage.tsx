import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom"
import './mainpage.css'
import { testApi } from "../../service/test";
import { message, Spin } from "antd";
import icon from './Fire.png'

export default function MainPage(){
    const {setIsStart}:any = useOutletContext();

    const [image, setImage] = useState("");
    const [textPrompt, setTextPrompt] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setIsStart(true);
        // eslint-disable-next-line
    }, [])

    function handleGen(){
        if(textPrompt.trim() === "") message.info("Vui lòng nhập mô tả!");
        else{
            message.loading("Đang tiến hành xử lí!");
            setLoading(true);
            const fetchData = async () =>{
                try {
                    const res = await testApi(textPrompt);
                    setImage(res.url);
                } catch (error) {
                    console.log(error);
                }
            }
            fetchData();
        }
    }

    useEffect(() => {
        if(image !=="") setLoading(false);
    }, [image])

    return(
        <div className="mainpage">
            <div className="inner">
                <div className="text">
                    <textarea name="" id="" placeholder="Hãy nhập mô tả của bạn ở đây..." onChange={e => setTextPrompt(e.target.value)} value={textPrompt}></textarea>
                    <div className="tips">
                        <div className="title">
                            <figure><img src={icon} alt="" /></figure>
                            <p>Khung ý tưởng</p>
                        </div>
                        <div className="content">
                            <p onClick={() => setTextPrompt(textPrompt +" <lora:noelLoraAI_v1:0.6>, ")}>Noel Lora</p>
                            <p onClick={() => setTextPrompt(textPrompt +" <lora:vintageLoraAI:0.6>, ")}>Vintage Lora</p>
                        </div>
                    </div>
                </div>
                <div className="to">
                    <p onClick={handleGen}>Tạo ngay!</p>
                </div>
                <div className="image">
                    {!loading ? 
                        image==="" ? <p>Ảnh sẽ được sinh ra ở đây</p>
                        :<figure><img src={image} alt="" /></figure>
                    : <div className="mess">
                        <Spin tip="Xử lí..." size="large"/>
                        <p>Hệ thống đang xử lí! Vui lòng chờ ...</p>
                    </div>}
                </div>
            </div>
        </div>
    )
}