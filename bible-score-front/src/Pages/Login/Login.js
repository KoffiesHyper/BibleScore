import './Login.css';
import '../../App.css';
import { useState } from 'react';
import JWTManager from '../../Components/JWT/JWT';
import { useHistory } from 'react-router-dom';

export default function Login({ updateSignedIn }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useHistory();

    const loginUser = async () => {
        const manager = new JWTManager;
        const pair = await manager.obtainPair(email, password);
        localStorage.setItem('accessToken', pair.data.access);
        localStorage.setItem('refreshToken', pair.data.refresh);
        updateSignedIn(true);
        navigate.push('/')
    }

    return (
        <div className='container'>
            <div className='inner-container'>
                <h1 className='default-label'>Login</h1>
                <div className='input-container'>
                    <h2 className='default-label'>Email</h2>
                    <input placeholder='Enter Your Email' onChange={(event) => {
                        setEmail(event.target.value);
                    }} />
                </div>
                <div className='input-container'>
                    <h2 className='default-label'>Password</h2>
                    <input placeholder='Enter Your Password' onChange={(event) => {
                        setPassword(event.target.value);
                    }} />
                </div>
                <button className='default-btn' onClick={loginUser}>Enter</button>
            </div>
        </div>
    );
}