import './Register.css';
import '../../App.css';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function Register({ updateUser }) {
    const [username, setUsername] = useState();
    const [surname, setSurname] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useHistory();

    const changeUsername = (event) => {
        setUsername(event.target.value);
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

    const registerUser = async () => {
        const user = await axios.post('http://127.0.0.1:8000/api/users/', JSON.stringify(
            {
                username: username,
                email: email,
                password: password
            }),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        updateUser(user.data);
        navigate.push('/');
    }

    return (
        <div className='container'>
            <div className='inner-container'>

                <h1 className='default-label'>Register</h1>

                <div className='input-container'>
                    <h2 className='default-label'>Username</h2>
                    <input placeholder='Enter Your Username' onChange={(e) => {
                        changeUsername(e);
                    }} />
                </div>

                <div className='input-container'>
                    <h2 className='default-label'>Surname</h2>
                    <input placeholder='Enter Your Surname' onChange={(e) => {
                        changeSurname(e);
                    }} />
                </div>

                <div className='input-container'>
                    <h2 className='default-label'>Email</h2>
                    <input placeholder='Enter Your Email' onChange={(e) => {
                        changeEmail(e);
                    }} />
                </div>

                <div className='input-container'>
                    <h2 className='default-label'>Password</h2>
                    <input placeholder='Enter Your Password' onChange={(e) => {
                        changePassword(e);
                    }} />
                </div>

                <button className='default-btn' onClick={registerUser} >Enter</button>
            </div>
        </div>
    );
}