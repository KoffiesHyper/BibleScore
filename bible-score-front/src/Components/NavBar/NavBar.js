import { useHistory, useParams } from "react-router-dom";
import './NavBar.css';
import { FaSearch } from "react-icons/fa";

export default function NavBar() {
    const navigate = useHistory();
    const { value } = useParams();

    return (
        <div>
            <div className='top-bar'>
                <div className="top-buttons">
                    <button onClick={() => navigate.push('/')}>Home</button>
                    <button onClick={() => navigate.push('/memorize')}>Memorize</button>
                    <button onClick={() => navigate.push('/dashboard')}>Dashboard</button>
                    <button>Sign In</button>
                    <button onClick={() => navigate.push('/register')}>Register</button>
                    <button onClick={() => navigate.push('/read')}>Read</button>
                </div>
                <div className="top-search">
                    <input type='text' placeholder="Search"></input>
                    <div className="search-button">
                        <FaSearch size='15px' />
                    </div>
                </div>
            </div>
        </div>
    );
}