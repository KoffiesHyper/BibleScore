import './Login.css';
import '../../App.css';
import { useState } from 'react';

export default function Login() {
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const changeEmail = (event) => {
        setEmail(event.target.value);
    }

    const changePassword = (event) => {
        setPassword(event.target.value);
    }

    return (
        <div className='container'>
            <div className='inner-container'>
                <h1 className='default-label'>Login</h1>
                <div className='input-container'>
                    <h2 className='default-label'>Email</h2>
                    <input onChange={(e) => {
                        changeEmail(e);
                    }} />
                </div>
                <div className='input-container'>
                    <h2 className='default-label'>Password</h2>
                    <input onChange={(e) => {
                        changePassword(e);
                    }} />
                </div>
                <button className='default-btn'>Enter</button>
            </div>
        </div>
    );
}