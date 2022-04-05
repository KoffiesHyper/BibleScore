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
            <div className='card-container' onClick={() => navigate.push('/read')}> 
                <IconContext.Provider value={{'color': 'var(--tertiary-color)'}}><BiBible size='50px' /></IconContext.Provider>
                <h2 className='default-label'>Read all chapters of the American Standard Version Bible</h2>
                <img height="100%" width="100%" src='https://wallpapercave.com/wp/wp5987658.jpg'/>
            </div>
            <div className='card-container' onClick={() => navigate.push('/memorize')}> 
                <IconContext.Provider value={{'color': 'var(--tertiary-color)'}}><BiBrain size='50px' /></IconContext.Provider>
                <h2 className='default-label'>Learn and Memorize Scipture In A More Intuitive, Enjoyable Way</h2>
                <img height="100%" width="100%" src='https://i.pinimg.com/564x/0d/05/b8/0d05b85945200d058b814d2ab6d80c0e.jpg'/>
            </div>
            <div className='card-container' onClick={() => navigate.push('/brethren')}> 
                <IconContext.Provider value={{'color': 'var(--tertiary-color)'}}><FaUserFriends size='50px' /></IconContext.Provider>
                <h2 className='default-label'>Have Fellowship With Other Bible-Believing Christians</h2>
                <img height="100%" width="100%" src='https://swall.teahub.io/photos/small/95-958253_2560x1600-simple-and-minimalist-wallpapers-data.jpg'/>
            </div>
        </div>
    );
}


