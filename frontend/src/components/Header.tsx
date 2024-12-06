import { useNavigate } from 'react-router-dom';
import './header.css'

interface Props{
    isStart: boolean;
}

export default function Header({isStart}:Props){
    const navigate = useNavigate();

    return (
        <header className='header'>
            <p className='infor'>Thông tin</p>
            {!isStart && <p className='start' onClick={() => navigate("/home")}>Bắt đầu!</p>}
        </header>
    )
}