import { useOutletContext } from 'react-router-dom'
import './welcome.css'
import { useEffect } from 'react';

export default function Welcome(){
    const {setIsStart}:any = useOutletContext();

    useEffect(() => {
        setIsStart(false);
        // eslint-disable-next-line
    },[])


    return (
        <div className='welcome'>
            <div className='inner'>
                <div className="infor">
                    <h2>STABLE DIFFUSION<br/>TEXT TO IMAGE</h2>
                    <p>Chào mừng bạn đến với chương trình <b><i>Tạo không gian quán cà phê</i></b> bằng công nghệ sinh ảnh duy nhất từ đoạn mô tả theo ý muốn của bạn.</p>
                </div>
            </div>
        </div>
    )
}