import { Link } from "react-router-dom";
import './NavBar.css';
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

export default function NavBar() {
    const [searchInput, setSearchInput] = useState('');

    return (
        <div>
            <div className='top-bar'>
                <div className="top-buttons">
                    <Link to='/' ><button>Home</button></Link>
                    <Link to='/memorize' ><button>Memorize</button></Link>
                    <Link to='/dashboard' ><button>Dashboard</button></Link>
                    <Link to='/' ><button>Sign In</button></Link>
                    <Link to='/register' ><button>Register</button></Link>
                    <Link to='/read' ><button>Read</button></Link>
                </div>
                <div className="top-search">
                    <input type='text' placeholder="Search" onChange={(event) => setSearchInput(event.target.value)}></input>
                    <Link to={`/search/${searchInput}`}>
                        <div className="search-button">
                            <FaSearch size='15px' />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}