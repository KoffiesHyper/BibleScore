import './Register.css';
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

                <h1>Register</h1>

                <div className='input-container'>
                    <h2>Name</h2>
                    <input onChange={(e) => {
                        changeName(e);
                    }} />
                </div>

                <div className='input-container'>
                    <h2>Surname</h2>
                    <input onChange={(e) => {
                        changeSurname(e);
                    }} />
                </div>

                <div className='input-container'>
                    <h2>Email</h2>
                    <input onChange={(e) => {
                        changeEmail(e);
                    }} />
                </div>

                <div className='input-container'>
                    <h2>Password</h2>
                    <input onChange={(e) => {
                        changePassword(e);
                    }} />
                </div>

                <button>Enter</button>
            </div>
        </div>
    );
}