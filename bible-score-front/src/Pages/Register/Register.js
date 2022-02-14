import './Register.css';
import '../../App.css';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import JWTManager from '../../Components/JWT/JWT';
import ReCAPTCHA from 'react-google-recaptcha';

export default function Register({ updateSignedIn }) {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [dateOfBirth, setDateOfBirth] = useState();
    const [password, setPassword] = useState();
    const [valid, setValid] = useState(false);

    const navigate = useHistory();

    const registerUser = async () => {
        const user = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/`, JSON.stringify(
            {
                username: username,
                email: email,
                first_name: firstName,
                last_name: lastName,
                date_of_birth: dateOfBirth,
                password: password
            }),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Key': process.env.REACT_APP_SERVER_API_KEY
                }
            }
        )

        if (user.data.email.length > 1) {
            const manager = new JWTManager();
            const pair = await manager.obtainPair(email, password);
            console.log(pair)
            localStorage.setItem('accessToken', pair.data.access);
            localStorage.setItem('refreshToken', pair.data.refresh);
            updateSignedIn(true);
            navigate.push('/');
        }
    }

    return (
        <div className='container'>
            <div className='inner-container'>

                <h1 className='default-label'>Register</h1>

                <div className='input-container'>
                    <h2 className='default-label'>Username</h2>
                    <input className='default-input' placeholder='Enter Your Username' onChange={(event) => {
                        setUsername(event.target.value);
                    }} />
                </div>

                <div className='input-container'>
                    <h2 className='default-label'>Email</h2>
                    <input className='default-input' placeholder='Enter Your Email' onChange={(event) => {
                        setEmail(event.target.value);
                    }} />
                </div>

                <div className='input-container'>
                    <h2 className='default-label'>First Name</h2>
                    <input className='default-input' placeholder='Enter Your first name' onChange={(event) => {
                        setFirstName(event.target.value);
                    }} />
                </div>

                <div className='input-container'>
                    <h2 className='default-label'>Last Name</h2>
                    <input className='default-input' placeholder='Enter Your Surname' onChange={(event) => {
                        setLastName(event.target.value);
                    }} />
                </div>

                <div className='input-container'>
                    <h2 className='default-label'>Birth Date</h2>
                    <input className='default-input' type='date' placeholder='Enter Your Birth Date' onChange={(event) => {
                        setDateOfBirth(event.target.value);
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

                <button className='default-btn' onClick={registerUser} disabled={valid ? '' : 'disabled'}>Enter</button>
            </div>
        </div>
    );
}