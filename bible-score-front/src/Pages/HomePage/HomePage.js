import './HomePage.css';
import '../../App.css';
import 'axios';
import { BiBible, BiBrain } from 'react-icons/bi';
import { FaUserFriends } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { useHistory } from 'react-router-dom';

export default function HomePage() {

    const navigate = useHistory();

    return (
        <div className='guest-body'>
            <div className='card-container'> 
                <IconContext.Provider value={{'color': 'var(--tertiary-color)'}}><BiBible size='100px' /></IconContext.Provider>
                <h2 className='default-label'>Read all chapters of the American Standard Version Bible</h2>
                <button className='default-btn' onClick={() => navigate.push('/read')}>Read Now</button>
            </div>
            <div className='card-container'> 
                <IconContext.Provider value={{'color': 'var(--tertiary-color)'}}><BiBrain size='100px' /></IconContext.Provider>
                <h2 className='default-label'>Learn and Memorize Scipture In A More Intuitive, Enjoyable Way</h2>
                <button className='default-btn' onClick={() => navigate.push('/memorize')}>Memorize Now</button>
            </div>
            <div className='card-container'> 
                <IconContext.Provider value={{'color': 'var(--tertiary-color)'}}><FaUserFriends size='100px' /></IconContext.Provider>
                <h2 className='default-label'>Have Online Fellowship With Other Bible-Believing Christians</h2>
                <button className='default-btn' onClick={() => navigate.push('/brethren')}>Fellowship Now</button>
            </div>
        </div>
    );
}


