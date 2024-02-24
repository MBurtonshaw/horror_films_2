import { React } from 'react';

export default function Header(props) {
    if (window.innerWidth < 768) {
        if (props.user === '') {
            return (
                <div id='Header' className='container animate'>
                    <h1><a href='/' className='nonchalant'>Horror Films</a></h1>
                    <div className="dropdown m-auto pt-3">
                        <button className="btn " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img id='menu_icon' className='w-25' alt='a menu icon, three horizontal bars' src='../../photos/menu_icon.png'></img>
                        </button>
                        <ul className="dropdown-menu text-center w-100 m-auto">
                            <li>
                                <button className="dropdown-item" type="button">
                                    <a href='/'>Home</a>
                                </button>
                            </li>
                            <li>
                                <button className="dropdown-item" type="button">
                                    <a href='/titles'>Titles</a>
                                </button>
                            </li>
                            <li>
                                <button className="dropdown-item" type="button">
                                    <a href='/genres'>Genres</a>
                                </button>
                            </li>
                            <li>
                                <button className="dropdown-item" type="button">
                                    <a href='/decades'>Decades</a>
                                </button>
                            </li>
                            <li>
                                <button className="dropdown-item" type="button">
                                    <a href='/login'>Login</a>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            );
        } else {
            return (
                <div id='Header' className='container'>
                    <h1><a href='/' className='nonchalant'>Horror Films</a></h1>
                    <div className="dropdown m-auto pt-3">
                        <button className="btn " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img id='menu_icon' className='w-25' alt='a menu icon, three horizontal bars' src='../../photos/menu_icon.png'></img>
                        </button>
                        <ul className="dropdown-menu text-center w-100 m-auto">
                            <li>
                                <button className="dropdown-item" type="button">
                                    <a href='/'>Home</a>
                                </button>
                            </li>
                            <li>
                                <button className="dropdown-item" type="button">
                                    <a href='/titles'>Titles</a>
                                </button>
                            </li>
                            <li>
                                <button className="dropdown-item" type="button">
                                    <a href='/genres'>Genres</a>
                                </button>
                            </li>
                            <li>
                                <button className="dropdown-item" type="button">
                                    <a href='/decades'>Decades</a>
                                </button>
                            </li>
                            <li>
                                <button className="dropdown-item" type="button">
                                    <a href='/list'>My List</a>
                                </button>
                            </li>
                            <li>
                                <button className="dropdown-item" type="button">
                                    <a href='/logout'>Logout</a>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            );
        }
    }
    return (
        <div>
            <h1><a href='/' className='nonchalant'>Horror Films</a></h1>
        </div>
    );
}
