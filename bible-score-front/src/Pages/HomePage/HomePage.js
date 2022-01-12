import './HomePage.css';
import '../../App.css';
import 'axios';
import PassageFinder from '../../Components/Passage/Passage';

export default function HomePage() {
    return (
        <div>
            <div className='guest-body'>
                <h1>KNOW THE WORD</h1>
                <button className='default-btn' onClick={async () => {
                    const finder = new PassageFinder();
                    const data = await finder.getKeywordSearch('Christ');
                    console.log(data);
                }}>Get Started</button>
            </div>
        </div>
    );
}


