import { Link } from "react-router-dom";
import './NavBar.css';
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { IconContext } from "react-icons/lib";

export default function NavBar() {
    const [searchInput, setSearchInput] = useState('');

    return (
        <div>
            <div className='top-bar'>
                <div className="top-left">
                    <Link to='/' ><button>Home</button></Link>
                    <Link to='/memorize' ><button>Memorize</button></Link>
                    <Link to='/dashboard' ><button>Dashboard</button></Link>
                    <Link to='/read' ><button>Read</button></Link>
                    <div className="top-search">
                        <input type='text' placeholder="Search" onChange={(event) => setSearchInput(event.target.value)}></input>
                        <Link to={`/search/${searchInput}`}>
                            <div className="search-button">
                                <IconContext.Provider value={{ color: "black", className: "global-class-name", size: '3em' }}>
                                    <div>
                                        <FaSearch size='15px' />
                                    </div>
                                </IconContext.Provider>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="top-right">
                    <Link to='/login' ><button>Log In</button></Link>
                    <Link to='/register' ><button>Register</button></Link>
                </div>
            </div>
        </div>
    );
}