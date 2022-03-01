import './Login.css';
import '../../App.css';
import { useState } from 'react';
import JWTManager from '../../Components/JWT/JWT';
import { useHistory } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

export default function Login({ updateSignedIn }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const navigate = useHistory();

    const loginUser = async () => {
        try {
            const manager = new JWTManager;
            const pair = await manager.obtainPair(email, password);
            localStorage.setItem('accessToken', pair.data.access);
            localStorage.setItem('refreshToken', pair.data.refresh);
            updateSignedIn(true);
            navigate.push('/')
        } catch{
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 2000);
        }
    }

    return (
        <div className='container'>
            {showMessage &&
                <div className='pop-up-message'>
                    <p>Failed Login Attempt</p>
                </div>
            }
            <div className='inner-container'>
                <h1 className='default-label'>Login</h1>
                <div className='input-container'>
                    <h2 className='default-label'>Email</h2>
                    <input className='default-input' placeholder='Enter Your Email' onChange={(event) => {
                        setEmail(event.target.value);
                    }} />
                </div>
                <div className='input-container'>
                    <h2 className='default-label'>Password</h2>
                    <input className='default-input' placeholder='Enter Your Password' onChange={(event) => {
                        setPassword(event.target.value);
                    }} />
                </div>
                <ReCAPTCHA
                    size='compact'
                    sitekey="6Lf3I1keAAAAANA_5YEGuSCE-hUfI9Zvyb-fnXyO"
                    onChange={() => setValid(true)}
                />
                <button className='default-btn' onClick={loginUser} disabled={valid ? '' : 'disabled'} >Enter</button>
            </div>
        </div>
    );
}