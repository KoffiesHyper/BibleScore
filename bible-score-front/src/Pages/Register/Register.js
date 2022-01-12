import './Register.css';
import '../../App.css';
import { useState } from 'react';

export default function Register() {
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    
    const changeName = (event) => {
        setName(event.target.value);
    }

    const changeSurname = (event) => {
        setSurname(event.target.value);
    }

    const changeEmail = (event) => {
        setEmail(event.target.value);
    }

    const changePassword = (event) => {
        setPassword(event.target.value);
    }

    return (
        <div className='container'>
            <div className='inner-container'>

                <h1 className='default-label'>Register</h1>

                <div className='input-container'>
                    <h2 className='default-label'>Name</h2>
                    <input onChange={(e) => {
                        changeName(e);
                    }} />
                </div>

                <div className='input-container'>
                    <h2 className='default-label'>Surname</h2>
                    <input onChange={(e) => {
                        changeSurname(e);
                    }} />
                </div>

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