import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom"
import './mainpage.css'
import { testApi } from "../../service/test";
import { message, Progress, Spin } from "antd";
import icon from './images/Fire.png';
import tet_img from './images/tet (2).png'
import modern_img from './images/modern (3).png'
import vintage_img from './images/coffee_vintage (8).png'
import halloween_img from "./images/haloween (6).png"
import noel_img from './images/noel (4).png'
import { modern_tags } from "../../data/modern_tags";
import { noel_tags } from "../../data/noel_tags";
import { tet_tags } from "../../data/tet_tags";
import { vintage_tags } from "../../data/vintage_tags";
import { halloween_tags } from "../../data/halloween_tags";

export default function MainPage(){
    const styles = ["Giáng sinh", "Hiện đại", "Tết truyền thống", "Vintage", "Halloween"];
    const styles_en = ["noel", "modern", "tet", "vintage", "halloween"];
    const imgs = [noel_img, modern_img, tet_img, vintage_img, halloween_img];
    const list_modern = [noel_tags, modern_tags, tet_tags, vintage_tags, halloween_tags];
    const {setIsStart}:any = useOutletContext();

    const [list, setList] = useState(list_modern[0]);
    const [image, setImage] = useState("");
    const [textPrompt, setTextPrompt] = useState("");
    const [style, setStyle] = useState("");
    const [loading, setLoading] = useState(false);
    const [percent, setPercent] = useState<number>(1);

    
    useEffect(() => {
        setIsStart(true);
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setPercent((prevCount) => {
            if (prevCount >= 100) {
              clearInterval(interval); 
              return 100;
            }
            return prevCount + 1;
          });
        }, 350);
    
        return () => clearInterval(interval);
      }, [loading]);

    function handleGen(){
        if(textPrompt.trim() === "") message.info("Vui lòng nhập mô tả!");
        else{
            message.loading("Đang tiến hành xử lí!");
            setLoading(true);
            setPercent(1);
            const fetchData = async () =>{
                try {
                    const res = await testApi(textPrompt, style);
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

    function addPrompt(add: string){
        setTextPrompt(textPrompt + " " + add + ",");
    }

    function onChoiceStyles(index: number){
        if(style === styles_en[index]) {
            setStyle("");
        }
        else{
            setStyle(styles_en[index]);
            setList(list_modern[index])
        }
    }

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
                            <div>
                                {styles.map((value, index) => 
                                    <div className={style===styles_en[index]?"select":""} onClick={() => onChoiceStyles(index)}>
                                        <figure><img src={imgs[index]} alt="" /></figure>
                                        <p>{value}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="list_tips">
                            <ul>
                                {list.map(index => 
                                    <li onClick={() => addPrompt(index)}>{index}</li>
                                )}
                            </ul>
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
                        <Progress percent={percent} type="circle" />
                        <p>Hệ thống đang xử lí! Vui lòng chờ ...</p>
                    </div>}
                </div>
            </div>
        </div>
    )
}