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
            <div className='home-heading'>
                <h1 className='first-line'>Bible</h1>
                <h1 className='second-line'>Score.</h1>
                <p>A Platform to study The Bible and connect with other Christians. Scroll down for more information.</p>
            </div>
            <div className='verse-of-day'>
                <h1>Verse of the Day</h1>
                <div className='head-line'></div>
                <div className='verse'>
                    <h2>Romans 8:28</h2>
                    <p>And we know that for those who love God all things work together for good, for those who are called according to His purpose.</p>
                </div>
            </div>
            <div className='guest-body'>
                <Card text='Read all chapters of the American Standard Version Bible.' icon='book' />
                <Card text='Learn and Memorize Scipture In A More Intuitive, Enjoyable Way.' icon='brain' />
                <Card text='Have Fellowship With Other Bible-Believing Christians.' icon='people' />
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

    function Card({ text, icon }) {

        let iconElement = <></>
        let linkRoute = '/';

        switch (icon) {
            case 'book':
                iconElement = <BiBible size='50px' />;
                linkRoute = '/read';
                break;
            case 'brain':
                iconElement = <BiBrain size='50px' />
                linkRoute = '/memorize';
                break;
            case 'people':
                iconElement = <FaUserFriends size='50px' />
                linkRoute = '/brethren';
                break;
        }

        return (
            <div className='card-container' onClick={() => navigate.push(linkRoute)}>
                <IconContext.Provider value={{ 'color': 'white' }}>{iconElement}</IconContext.Provider>
                <h2 className='default-label'>{text}</h2>
                <p>See More</p>
            </div>
        )
    }
}



