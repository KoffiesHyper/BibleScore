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
        <div className='landing-page'>
            <div className='verse-of-day'>
                <h1>Verse of the Day</h1>
                <div className='head-line'></div>
                <h2>Romans 8:28</h2>
                <p>And we know that for those who love God all things work together for good, for those who are called according to His purpose.</p>
            </div>
            <div className='guest-body'>
                <div className='card-container' onClick={() => navigate.push('/read')}>
                    <IconContext.Provider value={{ 'color': 'var(--tertiary-color)' }}><BiBible size='50px' /></IconContext.Provider>
                    <h2 className='default-label'>Read all chapters of the American Standard Version Bible</h2>
                    <div className='grad1'></div>
                    {/* <img height="100%" width="100%" src='https://wallpapercave.com/wp/wp5987658.jpg' /> */}
                </div>
                <div className='card-container' onClick={() => navigate.push('/memorize')}>
                    <IconContext.Provider value={{ 'color': 'var(--tertiary-color)' }}><BiBrain size='50px' /></IconContext.Provider>
                    <h2 className='default-label'>Learn and Memorize Scipture In A More Intuitive, Enjoyable Way</h2>
                    <div className='grad2'></div>
                    {/* <img height="100%" width="100%" src='https://i.pinimg.com/564x/0d/05/b8/0d05b85945200d058b814d2ab6d80c0e.jpg' /> */}
                </div>
                <div className='card-container' onClick={() => navigate.push('/brethren')}>
                    <IconContext.Provider value={{ 'color': 'var(--tertiary-color)' }}><FaUserFriends size='50px' /></IconContext.Provider>
                    <h2 className='default-label'>Have Fellowship With Other Bible-Believing Christians</h2>
                    <div className='grad3'></div>
                    {/* <img height="100%" width="100%" src='https://swall.teahub.io/photos/small/95-958253_2560x1600-simple-and-minimalist-wallpapers-data.jpg' /> */}
                </div>
            </div>
            <div className='more-info'>
                <div className='info-section'>
                    <h2 className='default-label'><span className='numbered'>1</span>Make it your Own</h2>
                    <p className='default-label'>With Bible Score, you can customize your Bible just the way you want. You can highlight and save verses, as well as add comments to a verse forum by clicking the blue button after a verse.</p>
                </div>
                <div className='info-line'></div>
                <div className='info-section'>
                    <h2 className='default-label'><span className='numbered'>2</span>Put Scripture in your heart</h2>
                    <p className='default-label'>Matthew 4:4 says: “It is written, ‘Man shall not live by bread alone, but by every word that comes from the mouth of God.’” Start storing Scripture in your heart, by using Bible Score's Memorization Tool. This tool will allow you to memorizer verses in a more interactive way.</p>
                </div>
                <div className='info-line'></div>
                <div className='info-section'>
                    <h2 className='default-label'><span className='numbered'>3</span>Share your Testimony</h2>
                    <p className='default-label'>Mark 5:19 says: “Go home to your friends and tell them how much the Lord has done for you, and how he has had mercy on you.” 
                    Dear Brethren, we must also share our testimony. One way of doing this, is by going to your <span style={{
                        fontStyle: 'italic', 
                        textDecorationLine: "underline",
                        cursor: "pointer"
                    }}>Profile</span> and sharing your story there.</p>
                </div>
            </div>
        </div>
    );
}


