import { useOutletContext } from 'react-router-dom'
import './welcome.css'
import { useEffect, useState } from 'react';
import { testApi } from '../../service/test';

export default function Welcome(){
    const {setIsStart}:any = useOutletContext();
    const [image, setImage] = useState("");

    useEffect(() => {
        setIsStart(false);
        // eslint-disable-next-line
    },[])

    function gen(){
        const fetchData = async () =>{
            try {
                const res = await testApi("coffee shop");
                setImage(res.url);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }

    return (
        <div className='welcome'>
            <div className='inner'>
                <div className="infor">
                    <h2 onClick={gen}>STABLE DIFFUSION<br/>TEXT TO IMAGE</h2>
                    <p>Chào mừng bạn đến với chương trình <b><i>Tạo không gian quán cà phê</i></b> bằng công nghệ sinh ảnh duy nhất từ đoạn mô tả theo ý muốn của bạn.</p>
                </div>
                <figure><img src={image} alt=""/></figure>
            </div>
        </div>
    )
}