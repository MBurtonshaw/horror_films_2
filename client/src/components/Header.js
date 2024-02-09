import { React } from 'react';

export default function Header(props) {

    /**************************************************************************************
        MOBILE
    ***************************************************************************************/
    if (window.innerWidth < 768) {
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //props.user comes from App.js, where it is derived from a cookie set in /contexts/context.js
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
        if (props.user === '') {
            return (
                <div id='Header' className='container animate'>
                    <div className="dropdown w-50 m-auto pt-3">
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
                    <div className="dropdown w-50 m-auto pt-3">
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
    } else {

        /**************************************************************************************
            DESKTOP
        ***************************************************************************************/

        if (props.user === '') {
            return (
                <div id='Header' className='container d-none d-md-block animate'>
                    <ul className="nav nav-fill justify-content-center">
                        <li className="nav-item header-nav">
                            <a className="nav-link" href="/"> Home </a>
                        </li>
                        <li className="nav-item header-nav">
                            <a className="nav-link" href="/titles"> Titles </a>
                        </li>
                        <li className="nav-item header-nav">
                            <a className="nav-link" href="/genres"> Genres </a>
                        </li>
                        <li className="nav-item header-nav">
                            <a className="nav-link" href="/decades"> Decades </a>
                        </li>
                        <li className="nav-item header-nav">
                            <a className="nav-link" href="/login"> Login </a>
                        </li>
                    </ul>
                </div>
            )
        } else {
            return (
                <div id='Header' className='container d-none d-md-block animate'>
                    <ul className="nav nav-fill justify-content-center">
                        <li className="nav-item header-nav">
                            <a className="nav-link" href="/"> Home </a>
                        </li>
                        <li className="nav-item header-nav">
                            <a className="nav-link" href="/titles"> Titles </a>
                        </li>
                        <li className="nav-item header-nav">
                            <a className="nav-link" href="/genres"> Genres </a>
                        </li>
                        <li className="nav-item header-nav">
                            <a className="nav-link" href="/decades"> Decades </a>
                        </li>
                        <li className="nav-item header-nav">
                            <a className="nav-link" href="/list"> My List </a>
                        </li>
                        <li className="nav-item header-nav">
                            <a className="nav-link" href="/logout"> Logout </a>
                        </li>
                    </ul>
                </div>
            );
        }
    }
}